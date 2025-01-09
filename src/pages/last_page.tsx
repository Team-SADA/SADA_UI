import { useContext, useEffect, useState } from "react";
import classes from "./last_page.module.scss";
import GlobalContext from "../components/context/context";
import { useNotification } from "../components/notification/NotificationProvider";

const LastPage = () => {
  const [id, setId] = useState("");
  const { stopTime, goBack } = useContext(GlobalContext);
  const [isSent, setIsSent] = useState(false);

  const { studentNumber } = useContext(GlobalContext);

  const notice = useNotification();

  useEffect(() => {
    stopTime();

    return () => {
      goBack();
    };
  }, [stopTime, goBack]);

  const disable =
    localStorage.getItem("phone-number") === null ||
    localStorage.getItem("name") === null ||
    localStorage.getItem("email") === null;

  const submitHandler = async () => {
    const time = localStorage.getItem("time");
    const name = localStorage.getItem("name");
    let phoneNumber = localStorage.getItem("phone-number");
    const email = localStorage.getItem("email");

    // console.log(phoneNumber);

    phoneNumber = phoneNumber!.split("-").join("");

    let reward;

    if (parseInt(time!) >= 0 && parseInt(time!) <= 300) {
      reward = 500;
    } else if (parseInt(time!) > 300 && parseInt(time!) <= 600) {
      reward = 400;
    } else {
      reward = 300;
    }

    if (studentNumber === "") {
      console.log(
        `https://sada.ziho.kr/coin/register?id=${id}&studentid=0&name=${name}&phone=${phoneNumber}&email=${email}`
      );
      fetch(
        `https://sada.ziho.kr/coin/register?id=${id}&studentid=0&name=${name}&phone=${phoneNumber}&email=${email}`
      )
        .then(() => {
          fetch(`https://sada.ziho.kr/coin/add/${id}/${name}/${reward}`);
          notice({ type: "SUCCESS", message: "SADA코인 개설 완료!" });
          setIsSent(true);
        })
        .catch(() => notice({ type: "ERROR", message: "SADA코인 개설 실패" }));
    } else {
      fetch(
        `https://sada.ziho.kr/coin/register?id=${id}&studentid=${studentNumber}&name=${name}&phone=${phoneNumber}&email=${email}`
      )
        .then(() => {
          fetch(`https://sada.ziho.kr/coin/add/${id}/${name}/${reward}`);
          notice({ type: "SUCCESS", message: "SADA코인 개설 완료!" });
          setIsSent(true);
        })
        .catch(() => notice({ type: "ERROR", message: "SADA코인 개설 실패" }));
    }

    localStorage.clear();
  };

  return (
      <main style={{paddingTop: "7rem"}}>
          <input
              className={classes.id}
              type="number"
              placeholder="마지막은 정상적인 UI! 아이디를 입력해주세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
          />
          <div style={{justifyContent: "center", flexDirection: "column", alignItems: "center", display: "flex"}}>
              <img src="logo.png" alt="" height={200} style={{marginTop: 100}}/>
          </div>
      </main>
  );
};

export default LastPage;
