import { useContext, useEffect, useState } from "react";
import classes from "./student_number_page.module.scss";
import { useNotification } from "../components/notification/NotificationProvider";
import GlobalContext from "../components/context/context";
import { useNavigate } from "react-router";

const json: any = require("../components/context/data.json");

const slotInterval = 200;

const StudentNumberPage = () => {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [thirdNumber, setThirdNumber] = useState(0);
  const [fourthNumber, setFourthNumber] = useState(0);

  const notice = useNotification();
  const navigate = useNavigate();
  const { setStudentNumber } = useContext(GlobalContext);

  const [firstInterval, setFirstInterval] = useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const [secondInterval, setSecondInterval] = useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const [thirdInterval, setThirdInterval] = useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const [fourthInterval, setFourthInterval] = useState<ReturnType<
    typeof setInterval
  > | null>(null);

  useEffect(() => {
    setFirstInterval(
      setInterval(() => {
        setFirstNumber((prevState) => (prevState + 1) % 10);
      }, slotInterval)
    );
    setSecondInterval(
      setInterval(() => {
        setSecondNumber((prevState) => (prevState + 1) % 10);
      }, slotInterval)
    );
    setThirdInterval(
      setInterval(() => {
        setThirdNumber((prevState) => (prevState + 1) % 10);
      }, slotInterval)
    );
    setFourthInterval(
      setInterval(() => {
        setFourthNumber((prevState) => (prevState + 1) % 10);
      }, slotInterval)
    );
  }, []);

  const firstButtonClickHandler = () => {
    if (firstInterval) {
      clearInterval(firstInterval);
      setFirstInterval(null);
    }
  };

  const secondButtonClickHandler = () => {
    if (secondInterval) {
      clearInterval(secondInterval);
      setSecondInterval(null);
    }
  };

  const thirdButtonClickHandler = () => {
    if (thirdInterval) {
      clearInterval(thirdInterval);
      setThirdInterval(null);
    }
  };

  const fourthButtonClickHandler = () => {
    if (fourthInterval) {
      clearInterval(fourthInterval);
      setFourthInterval(null);
    }
  };

  const restartButtonClickHandler = () => {
    if (firstInterval) {
      clearInterval(firstInterval);
      setFirstInterval(null);
    }
    if (secondInterval) {
      clearInterval(secondInterval);
      setSecondInterval(null);
    }
    if (thirdInterval) {
      clearInterval(thirdInterval);
      setThirdInterval(null);
    }
    if (fourthInterval) {
      clearInterval(fourthInterval);
      setFourthInterval(null);
    }

    setFirstNumber(0);
    setSecondNumber(0);
    setThirdNumber(0);
    setFourthNumber(0);

    setFirstInterval(
      setInterval(() => {
        setFirstNumber((prevState) => (prevState + 1) % 10);
      }, slotInterval)
    );
    setSecondInterval(
      setInterval(() => {
        setSecondNumber((prevState) => (prevState + 1) % 10);
      }, slotInterval)
    );
    setThirdInterval(
      setInterval(() => {
        setThirdNumber((prevState) => (prevState + 1) % 10);
      }, slotInterval)
    );
    setFourthInterval(
      setInterval(() => {
        setFourthNumber((prevState) => (prevState + 1) % 10);
      }, slotInterval)
    );
  };

  const submitHandler = () => {
    const number =
      firstNumber.toString() +
      secondNumber.toString() +
      thirdNumber.toString() +
      fourthNumber.toString();

    if (Object.keys(json).includes(number)) {
      notice({
        type: "SUCCESS",
        message: `환영합니다!`,
      });

      setStudentNumber(number);

      localStorage.setItem("studentNumber", number);

      navigate("/name");
    } else {
      notice({
        type: "SUCCESS",
        message: `${number}(은/는) 유효한 학번이 아닙니다~`,
      });
    }
  };

  return (
    <main className={classes.main}>
      <h1>
        <img src="logo.png" alt="" />
        학번
      </h1>
      <p>실력이 가미된 슬롯머신!</p>
      <p>슬롯을 맞춰 학번을 입력하세요</p>
      <div className={classes.slot}>
        <div>
          <span>{firstNumber}</span>
          <button
            onClick={firstButtonClickHandler}
            className="btn-flat"
            disabled={firstInterval === null}
          >
            정지!
          </button>
        </div>
        <div>
          <span>{secondNumber}</span>
          <button
            onClick={secondButtonClickHandler}
            className="btn-flat"
            disabled={secondInterval === null}
          >
            정지!
          </button>
        </div>
        <div>
          <span>{thirdNumber}</span>
          <button
            onClick={thirdButtonClickHandler}
            className="btn-flat"
            disabled={thirdInterval === null}
          >
            정지!
          </button>
        </div>
        <div>
          <span>{fourthNumber}</span>
          <button
            onClick={fourthButtonClickHandler}
            className="btn-flat"
            disabled={fourthInterval === null}
          >
            정지!
          </button>
        </div>
      </div>
      <div className={classes.restart}>
        <span>실패하셨다구요?? 어쩔 수 없군요</span>
        <button className="btn" onClick={restartButtonClickHandler}>
          다시 시작!
        </button>
      </div>
      <div className={classes.control}>
        <button className="btn-flat" onClick={submitHandler}>
          넘어가기
        </button>
      </div>
    </main>
  );
};

export default StudentNumberPage;
