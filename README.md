## Next.js + firebase 빌드 + 배포 명령어

```bash
npm run build
# and
firebase deploy

# else
npm run export        # out/ 폴더 생성됨 (public용)

# or  한번에
npm run deploy
```

<!-- 성공하면 https://[프로젝트ID].web.app 주소에 배포 -->

### App Router 기반 구조

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

#
#

## LoginForm.tsx 포함된 기능 요약
| 기능           | 구현 여부 | 설명                            |
| ------------ | ----- | ----------------------------- |
| 이메일 입력       | ✅     | 상태로 관리 (`email`)              |
| 비밀번호 입력      | ✅     | 상태로 관리 (`password`)           |
| 자동 로그인       | ✅     | 서버에 `autoLogin` 전달 → 세션 쿠키 연장 |
| 아이디 저장       | ✅     | `localStorage`에 이메일 저장        |
| 저장된 이메일 불러오기 | ✅     | 초기 `useEffect`로 처리            |
