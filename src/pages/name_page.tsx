import { useNavigate } from "react-router";
import classes from "./name_page.module.scss";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../components/context/context";
import { useNotification } from "../components/notification/NotificationProvider";
import { v4 } from "uuid";

const json: any = require("../components/context/data.json");

const nameChars = [
  "가감갑강건겸경고공곽관교구국권",
  "규균금기김나난남노다도동라랑로",
  "록류륜리린림마명무묵문미민박방배",
  "백범변병보빈빛삭상서석선성세소",
  "손솔송수순승시신아안양엘연열영",
  "예오옥완요용우욱웅원유윤율은의",
  "이인일임장재전정제조종주준지진",
  "차찬창채천철청최태택하한함해허",
  "헌혁현형혜호홍환황효후훈휘흔희",
]
  .join("")
  .split(""); // 136 = 15 * 9 + 1

const shuffle = (array: any[]) => {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const randomLeft = () =>
  Math.random() * (window.innerWidth > 720 ? 720 : window.innerWidth);

interface Block {
  char: string;
  left: number;
  id: string;
}

export default function NamePage() {
  const navigate = useNavigate();
  const notice = useNotification();
  const { studentNumber } = useContext(GlobalContext);

  const [mouseX, setMouseX] = useState(window.innerWidth / 2);
  const [basketChar, setBasketChar] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [blockList, setBlockList] = useState<Block[]>([]);
  const [intervalId, setIntervalId] = useState<ReturnType<
    typeof setInterval
  > | null>(null);

  useEffect(() => {
    const listener = (event: any) => setMouseX(event.clientX);

    document.addEventListener("mousemove", listener);

    return () => {
      document.removeEventListener("mousemove", listener);
    };
  }, [studentNumber]);

  useEffect(() => {
    if (studentNumber) {
      const newList = shuffle(
        shuffle(nameChars)
          .slice(0, 60)
          .concat(Array(5).fill(json[studentNumber].split("")).flat())
      );

      console.log(json[studentNumber]);
      console.log(newList);

      let index = 0;

      setIntervalId(
        setInterval(() => {
          setBlockList((prev) => [
            ...prev,
            { char: newList[index], left: randomLeft(), id: v4() },
          ]);
          index = (index + 1) % newList.length;
        }, 300)
      );
    }
  }, [studentNumber]);

  const submitHandler = () => {
    if (name !== json[studentNumber]) {
      notice({
        type: "ERROR",
        message: "학번과 이름이 안 맞네요~",
      });
      return;
    }

    clearInterval(intervalId!);

    notice({
      type: "SUCCESS",
      message: "이름 쓰기 성공!",
    });
    localStorage.setItem("name", name);
    navigate("/birthday");
  };

  return (
    <main className={classes.section}>
      <header className={classes.header}>
        <h2>이름을 입력하세요</h2>
        <div className={classes.title}>
          <input type="text" value={name} readOnly />
          <div>
            <button
              className="btn-flat"
              onClick={() => setName(name.slice(0, -1))}
            >
              Backspace
            </button>
          </div>
        </div>
        <div>
          자신의 이름에 포함된 글자를 바구니에 순서 상관없이 담아보아요!
          <br />
          바구니에는 글자 하나만 넣을 수 있어요!
          <br />
          바구니의 입력 버튼을 눌러 바구니에 담은 글자를 이름에 추가하세요!
          <br />
          모든 글자를 추가하셨다면 '이름 글자 섞기' 버튼을 눌러 이름을 맞춰
          보세요!
        </div>
      </header>
      <div className={classes.nameTable}>
        {blockList.map((block) => (
          <span
            className={classes.line}
            style={{ left: block.left }}
            key={block.id}
            onAnimationEnd={() => {
              const relativeDistance =
                block.left -
                mouseX +
                16 +
                (window.innerWidth > 720 ? (window.innerWidth - 720) / 2 : 0);
              if (relativeDistance >= -65 && relativeDistance <= 65) {
                setBasketChar(block.char);
              }
              setBlockList((prev) => prev.filter((b) => b.id !== block.id));
            }}
          >
            {block.char}
          </span>
        ))}
      </div>
      <div className={classes.basket} style={{ left: mouseX - 60 }}>
        <img src={"./basket.png"} alt="basket" />
        <div>
          <span>{basketChar !== null ? basketChar : "_"} </span>
        </div>
        <button
          className={`btn-flat ${classes.button1}`}
          onClick={() => {
            setName(name + basketChar);
            setBasketChar(null);
          }}
          disabled={basketChar === null}
        >
          입력
        </button>
      </div>
      <button className={`btn-flat ${classes.submit}`} onClick={submitHandler}>
        넘어가기
      </button>
    </main>
  );
}
