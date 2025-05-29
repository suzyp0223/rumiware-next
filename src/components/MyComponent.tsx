// 예: src/components/MyComponent.tsx
'use client';

import { useState } from 'react';

export default function MyComponent() {
  const [count, setCount] = useState(0); // ✅ 이제 에러 없음
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
