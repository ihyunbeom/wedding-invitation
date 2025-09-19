import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2026-01-11 12:40", "Asia/Seoul")
export const HOLIDAYS = [11]

export const LOCATION = "라마다 서울 신도림 호텔 하늘정원홀"
export const LOCATION_ADDRESS = "서울시 구로구 경인로 624"

export const SHARE_ADDRESS = LOCATION
export const SHARE_ADDRESS_TITLE = LOCATION

export const WEDDING_HALL_POSITION = [126.885328, 37.5063294]

export const NMAP_PLACE_ID = 986184099
export const KMAP_PLACE_ID = 1212235250

export const BRIDE_FULLNAME = "이아람"
export const BRIDE_FIRSTNAME = "아람"
export const BRIDE_TITLE = "차녀"
export const BRIDE_FATHER = "이동일"
export const BRIDE_MOTHER = "양미경"
export const BRIDE_INFO = [
  {
    relation: "신부",
    name: BRIDE_FULLNAME,
    phone: "010-0000-0000",
    account: "우리은행 0000000000000",
  },
  {
    relation: "신부 아버지",
    name: BRIDE_FATHER,
    phone: "010-0000-0000",
    account: "하나은행 00000000000",
  },
  {
    relation: "신부 어머니",
    name: BRIDE_MOTHER,
    phone: "010-0000-0000",
    account: "하나은행 00000000000000",
  },
]

export const GROOM_FULLNAME = "이현범"
export const GROOM_FIRSTNAME = "현범"
export const GROOM_TITLE = "장남"
export const GROOM_FATHER = "이계현"
export const GROOM_MOTHER = "이현숙"
export const GROOM_INFO = [
  {
    relation: "신랑",
    name: GROOM_FULLNAME,
    phone: "010-0000-0000",
    account: "하나은행 00000000000000",
  },
  {
    relation: "신랑 아버지",
    name: GROOM_FATHER,
    phone: "010-0000-0000",
    account: "신한은행 000000000000",
  },
  {
    relation: "신랑 어머니",
    name: GROOM_MOTHER,
    phone: "010-0000-0000",
    account: "국민은행 000000000000",
  },
]
