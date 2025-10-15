import {
  BRIDE_FULLNAME,
  GROOM_FULLNAME,
  LOCATION,
  LOCATION_ADDRESS,
  WEDDING_DATE,
} from "../../const";
import { COVER_IMAGE } from "../../images";
// LazyDiv을 유지하고 싶다면 사용, 아니라면 <section>으로 바꿔도 됩니다.
import { LazyDiv } from "../lazyDiv";

export const Cover = () => {
  return (
    <LazyDiv className="section cover">
      <div className="img-overlay">
        <img src={COVER_IMAGE} alt="cover" />
        <div className="fade" />
        <div className="overlay-txt">
          <p className="invited">YOU’RE INVITED TO</p>
          <h1 className="title">
            {GROOM_FULLNAME} &nbsp; / &nbsp; {BRIDE_FULLNAME}
          </h1>
          <p className="meta">
            {WEDDING_DATE.format("YYYY.MM.D (ddd) A h:mm")}
          </p>
          <p className="meta">{LOCATION}</p>
          <p className="meta">{LOCATION_ADDRESS}</p>
        </div>
      </div>
    </LazyDiv>
  );
};
