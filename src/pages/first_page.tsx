import { useContext, useState } from "react";
import classes from "./first_page.module.scss";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../components/context/context";

const FirstPage = () => {
  const [agree, setAgree] = useState<boolean>(true);
  const navigate = useNavigate();

  const { activateTime } = useContext(GlobalContext);

  const checkboxClickHandler = (_: any) => {
    setAgree(false);
    setTimeout(() => {
      setAgree(true);
    }, 500);
  };

  const nextPageHandler = (_: any) => {
    activateTime();
    navigate("/student-number");
  };

  return (
    <div className={classes.index}>
      <header></header>
      <main>
        <section>
          <img src="logo.png" alt="" />
          <h1>끔찍한 UI 챌린지!</h1>
          <span className={classes.yakgwan}>[약관]</span>
          <ol>
            <li>
              해당 전화번호는 <em>광고성 목적</em>으로 이용되며, 설문 작성일
              이후로부터 1일 이내에 전화가 올 수 있습니다.
            </li>
            <li>
              설문에서 입력받은 모든 개인정보는 <em>추첨 이외의 목적</em>으로
              사용되며, 상업적 목적으로 <em>이용</em>될 수 있습니다.{" "}
            </li>
            <li>
              1주일이 지나도 개인정보는 <em>파기되지 않습니다.</em>
            </li>
          </ol>
          <div className={classes.control}>
            <label htmlFor="input">개인정보 수집에 동의합니까?</label>
            <input
              id="input"
              checked={agree}
              type="checkbox"
              onClick={checkboxClickHandler}
              onChange={() => {}}
            />
          </div>
          <button className="btn-flat">
            <span>다음 페이지로 넘어가지 않기</span>
          </button>
          <span>
            <span onClick={nextPageHandler}>여기</span>
            {"를 "}
            <span className={classes.fakeclick}>눌러</span> 다음 페이지로
            <span className={classes.red}> 넘어가세요</span>
          </span>
        </section>
      </main>
    </div>
  );
};

export default FirstPage;
