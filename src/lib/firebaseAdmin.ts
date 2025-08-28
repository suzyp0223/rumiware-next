// src/libs/firebaseAdmin.ts
import * as admin from "firebase-admin";

const app = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FB_PROJECT_ID,
        clientEmail: process.env.FB_CLIENT_EMAIL,
        privateKey: process.env.FB_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
      storageBucket: process.env.FB_STORAGE_BUCKET,
    });

export const adminDb = admin.firestore(app);
export const adminBucket = admin.storage().bucket();
