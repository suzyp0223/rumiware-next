// http://localhost:3000/admin/products
import { NextResponse } from "next/server";
export const runtime = "nodejs";

import * as admin from "firebase-admin";
import { v4 as uuid } from "uuid";

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function initAdmin() {
  if (!admin.apps.length) {
    const projectId = mustEnv("FB_PROJECT_ID");
    const clientEmail = mustEnv("FB_CLIENT_EMAIL");
    const privateKey = mustEnv("FB_PRIVATE_KEY").replace(/\\n/g, "\n");
    admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
      // storageBucket 옵션은 생략 (아래에서 명시적 지정)
    });
  }
  return {
    db: admin.firestore(),
    storage: admin.storage(),
  };
}

// 디버그: GET /api/admin/seed-products 로 환경/버킷 접근 점검
export async function GET() {
  try {
    const { storage } = initAdmin();
    const bucketName = mustEnv("FB_STORAGE_BUCKET");
    const bucket = storage.bucket(bucketName);

    // 버킷 접근/파일 유무 빠른 확인
    const prefix = "products/p003/"; // 존재하는 폴더 하나 지정
    const [files] = await bucket.getFiles({ prefix, maxResults: 5 });
    const sample = files.map((f) => f.name);

    return NextResponse.json({
      ok: true,
      bucketName,
      sampleCount: sample.length,
      sample, // 화면에 경로가 보이면 버킷 접근 OK
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("GET seed-products error:", e);
    return new NextResponse("DEBUG ERROR: " + msg, { status: 500 });
  }
}

// 실제 시드: POST /api/admin/seed-products
export async function POST() {
  try {
    const { db, storage } = initAdmin();
    const bucketName = mustEnv("FB_STORAGE_BUCKET");
    const bucket = storage.bucket(bucketName);

    // const buildCategoryKeys = (p: string) =>
    //   p
    //     .split("/")
    //     .filter(Boolean)
    //     .map((_, i, arr) => arr.slice(0, i + 1).join("/"));

    const SEED_META = {
      p001: {
        title: "댄디한 정장",
        price: 79000,
        discountRate: 51,
        description: "댄디하고 깔끔한 느낌의 정장",
        pathName: "suit/formal",
        categoryPaths: ["best-100"],
        stock: 10,
        sold: 123,
        options: ["S", "M", "L"],
        color: ["white", "black", "gray"],
      },
      p002: {
        title: "오버사이즈 자켓",
        price: 48000,
        discountRate: 54,
        description: "모던한 느낌의 오버핏 자켓",
        pathName: "outer/jacket",
        categoryPaths: ["sale"],
        stock: 12,
        sold: 85,
        options: ["Free"],
        color: ["white", "black", "gray"],
      },
      p003: {
        title: "플레어 스커트",
        price: 59000,
        discountRate: 40,
        description: "사랑스러운 스커트",
        pathName: "dress/flare",
        stock: 30,
        sold: 201,
      },
      p004: {
        title: "데일리 기본 블라우스",
        price: 43000,
        discountRate: 60,
        description: "가볍고 시원한 여름용 블라우스",
        pathName: "top/blouse/shirt",
        stock: 10,
        sold: 44,
      },
      p005: {
        title: "스트레이트 데님",
        price: 19000,
        discountRate: 0,
        description: "데일리 데님",
        pathName: "bottom/denim",
        stock: 120,
        sold: 350,
      },
    } as const;

    const log: string[] = [];

    for (const productId of Object.keys(SEED_META)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const meta = (SEED_META as any)[productId];

      // 1) 폴더 내 파일 나열 (끝에 슬래시 꼭)
      const prefix = `products/${productId}/`;
      const [files] = await bucket.getFiles({ prefix });
      if (!files.length) {
        log.push(`⚠ ${productId}: files not found under ${prefix}`);
        continue;
      }

      const parts = meta.pathName.split("/").filter(Boolean);
      const [main, sub, third] = parts;

      // 2) 다운로드 URL 생성(토큰 없으면 부여)
      const urls: string[] = [];
      for (const f of files) {
        const [metadata] = await f.getMetadata();
        let token = metadata.metadata?.firebaseStorageDownloadTokens as string | undefined;
        if (!token) {
          token = uuid();
          await f.setMetadata({ metadata: { firebaseStorageDownloadTokens: token } });
        }
        const path = encodeURIComponent(f.name);
        urls.push(
          `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${path}?alt=media&token=${token}`
        );
      }
      urls.sort();

      // 3) Firestore upsert
      const category: Record<string, string> = { pathName: meta.pathName, main };
      if (sub) category.sub = sub;
      if (third) category.third = third;

      const categoryKeys = parts.map((_, i) => parts.slice(0, i + 1).join("/"));

      // const categoryKeys = buildCategoryKeys(meta.pathName);
      await db
        .collection("products")
        .doc(productId)
        .set(
          {
            title: meta.title,
            price: meta.price,
            discountRate: meta.discountRate ?? 0,
            description: meta.description ?? "",
            images: urls,
            category,
            // category: {
            //   main: categoryKeys[0] ?? "",
            //   sub: categoryKeys[1]?.split("/")[1],
            //   third: categoryKeys[2]?.split("/")[2],
            //   pathName: meta.pathName,
            // },
            categoryPaths: meta.categoryPaths ?? [],
            categoryKeys,
            stock: meta.stock,
            sold: meta.sold,
            options: meta.options ?? [],
            color: meta.color ?? [],
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

      log.push(`✔ ${productId} 문서 생성 (${urls.length} images)`);
    }

    return NextResponse.json({ ok: true, log });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("POST seed-products error:", e);
    return new NextResponse("Seed failed: " + msg, { status: 500 });
  }
}
