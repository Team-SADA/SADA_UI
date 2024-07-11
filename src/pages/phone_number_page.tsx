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
      전화번호
      <button className="btn-flat" onClick={submitHandler}>
        asdf
      </button>
    </main>
  );
};

export default PhoneNumberPage;
