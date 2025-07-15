const namedColors: Record<string, [number, number, number]> = {
  black: [0, 0, 0],
  white: [255, 255, 255],
  red: [255, 0, 0],
  blue: [0, 0, 255],
  green: [0, 128, 0],
  navy: [0, 0, 128],
  yellow: [255, 255, 0],
  gray: [128, 128, 128],
  darkblue: [0, 0, 139],
  // 필요시 더 추가 가능
};

const isBrowser = () => typeof window !== "undefined";

// HEX or named color를 받아 밝기를 계산하고 텍스트 색상을 결정
const getTextColor = (color: string): "white" | "black" => {
  let r = 0,
    g = 0,
    b = 0;
  const lowerColor = color.toLowerCase();

  // 1️⃣ named color 먼저 처리
  if (namedColors[lowerColor]) {
    [r, g, b] = namedColors[lowerColor];
  }

  // 2️⃣ HEX 코드 처리
  else if (color.startsWith("#")) {
    const hex = color.slice(1); // # 제거
    const fullHex =
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("") // #fff → #ffffff
        : hex.padEnd(6, "0"); // 부족한 경우 뒷자리 채움

    // HEX 코드일 경우 문자열을 파싱하여 16진수 → 10진수 RGB로 변환
    const bigint = parseInt(fullHex, 16);
    r = (bigint >> 16) & 255;
    g = (bigint >> 8) & 255;
    b = bigint & 255;
  }

  // 3️⃣ rgb() 포맷
  // "rgb(0, 0, 255)"를 정규식 숫자만 뽑아서 r, g, b로 변환
  else if (color.startsWith("rgb")) {
    const match = color.match(/\d+/g);
    if (match) {
      [r, g, b] = match.map(Number);
    }
  }

  // 4️⃣ canvas fallback (브라우저 전용)
  else if (isBrowser()) {
    const ctx = document.createElement("canvas").getContext("2d");
    if (ctx) {
      ctx.fillStyle = color; // 색상 이름 또는 기타 문자열
      const match = ctx.fillStyle.match(/\d+/g);
      if (match) {
        [r, g, b] = match.map(Number);
      }
    }
  }

  // 밝기(brightness) 계산 및 텍스트 색상 결정
  // 밝기가 186보다 작으면 어두운 배경 → 텍스트는 "white"
  // 밝기가 186 이상이면 밝은 배경 → 텍스트는 "black"
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 186 ? "white" : "black";
};

export default getTextColor;
