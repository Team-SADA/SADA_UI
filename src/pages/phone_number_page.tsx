import { useContext } from "react";
import GlobalContext from "../components/context/context";
import { useNavigate } from "react-router";

const PhoneNumberPage = () => {
  const { stopTime } = useContext(GlobalContext);

  const navigate = useNavigate();

  const submitHandler = () => {
    stopTime();
    navigate("/last-page");
  };

  return (
    <main>
      <h1>
        <img src="logo.png" alt="" />
        전화번호
      </h1>
      <button className="btn-flat" onClick={submitHandler}>
        넘어가기
      </button>
    </main>
  );
};

export default PhoneNumberPage;
