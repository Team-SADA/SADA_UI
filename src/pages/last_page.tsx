import { useContext, useEffect, useState } from "react";
import classes from "./last_page.module.scss";
import GlobalContext from "../components/context/context";
import { useNotification } from "../components/notification/NotificationProvider";

const students = require("../components/context/data.json");

const secondsToMMSS = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${minutes}:${paddedSeconds}`;
};

const LastPage = () => {
  const [list, setList] = useState([]);
  const { stopTime, goBack } = useContext(GlobalContext);

  const { studentNumber } = useContext(GlobalContext);

  const notice = useNotification();

  useEffect(() => {
    stopTime();
    getList();

    return () => {
      goBack();
    };
  }, [stopTime, goBack]);

  const getList = async () => {
    const response = await fetch(
      "https://b58d-222-120-17-67.ngrok-free.app/data"
    ).then((req) => console.log(req));

    // setList(json);
  };

  const handleUpdate = async (name: string, score: number) => {
    try {
      const newData = { name, score };

      const response = await fetch(
        "https://b58d-222-120-17-67.ngrok-free.app/update-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );

      if (response.ok) {
        const responseData = await response.text();
        notice({ type: "SUCCESS", message: responseData.toString() });
        getList();
      } else {
        notice({ type: "ERROR", message: "갠춘에러" });
      }
    } catch (error) {
      console.error("Error updating data:", error);
      notice({ type: "ERROR", message: "에러" });
    }
  };

  const disable =
    localStorage.getItem("phone-number") === null ||
    localStorage.getItem("name") === null ||
    localStorage.getItem("email") === null;

  const submitHandler = async () => {
    const time = localStorage.getItem("time");
    const name = localStorage.getItem("name");
    let phoneNumber = localStorage.getItem("phone-number");
    const email = localStorage.getItem("email");

    console.log(phoneNumber);

    phoneNumber = phoneNumber!.split("-").join("");

    console.log(studentNumber);

    if (studentNumber === "") {
      handleUpdate(name!, parseInt(time!));
      fetch(
        `https://sada.ziho.kr/coin/register?id=0&name=${name}&phone=${phoneNumber}&email=${email}`
      )
        .then(() => {
          fetch(`https://sada.ziho.kr/coin/add/0/${name}/10000`);
          notice({ type: "SUCCESS", message: "SADA코인 개설 완료!" });
        })
        .catch(() => notice({ type: "ERROR", message: "SADA코인 개설 실패" }));
    } else {
      handleUpdate(
        studentNumber + " " + students[studentNumber],
        parseInt(time!)
      );
      fetch(
        `https://sada.ziho.kr/coin/register?id=${studentNumber}&name=${students[studentNumber]}&phone=${phoneNumber}&email=${email}`
      )
        .then(() => {
          fetch(`https://sada.ziho.kr/coin/add/${studentNumber}/${name}/10000`);
          notice({ type: "SUCCESS", message: "SADA코인 개설 완료!" });
        })
        .catch(() => notice({ type: "ERROR", message: "SADA코인 개설 실패" }));
    }

    localStorage.clear();
  };

  return (
    <main style={{ paddingTop: "7rem" }}>
      <ul className={classes.list}>
        {list.length === 0 ? (
          <span style={{ textAlign: "center" }}>
            첫번째 클리어! 기록을 추가해주세요
          </span>
        ) : (
          list.map((item, i) => (
            <li key={i}>
              <span>{item["name"]}</span>
              <span>{secondsToMMSS(item["score"] as number)}</span>
            </li>
          ))
        )}
      </ul>
      <button className="btn-flat" onClick={submitHandler} disabled={disable}>
        내 기록 추가 및 SADA코인 받기
      </button>
    </main>
  );
};

export default LastPage;
