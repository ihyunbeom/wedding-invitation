// src/env.ts
type V = string | undefined;
const get = (k: string, fb = ""): string =>
  ((import.meta as any).env[k] as V) ?? fb;

const toBool = (v: string) =>
  ["true", "1", "yes", "y", "on"].includes(String(v).trim().toLowerCase());

// ---- named exports (모듈 어디서나 개별 import 가능)
export const SERVER_URL        = get("VITE_SERVER_URL");
export const SITE_URL          = get("VITE_SITE_URL");
export const KAKAO_KEY         = get("VITE_KAKAO_SDK_JS_KEY");   // 표준 이름
export const NAVER_MAP_CLIENT_ID = get("VITE_NAVER_MAP_CLIENT_ID");
export const KAKAO_SDK_JS_KEY  = KAKAO_KEY;                      // 호환 별칭
export const RSVP_FORM         = get("VITE_RSVP_GOOGLE_FORM");
export const STATIC_ONLY       = toBool(get("VITE_STATIC_ONLY", "false"));

// ---- 객체로도 제공
export const ENV = {
  NAVER_MAP_CLIENT_ID,
  SERVER_URL,
  SITE_URL,
  KAKAO_KEY,
  KAKAO_SDK_JS_KEY, // 동일 값
  RSVP_FORM,
  STATIC_ONLY,
} as const;
