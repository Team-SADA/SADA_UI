import { useNavigate } from "react-router";
import classes from "./name_page.module.scss";
import { useEffect, useState } from "react";
import { useNotification } from "../../components/notification/NotificationProvider";
import { v4 } from "uuid";

import * as Hangul from "hangul-js";

const nameChars = ["ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ", "ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣㅐㅔㅒㅖ"]
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

export default function NonStudentNamePage() {
  const navigate = useNavigate();
  const notice = useNotification();

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
  }, []);

  useEffect(() => {
    const newList = shuffle(nameChars);

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
  }, []);

  const submitHandler = () => {
    clearInterval(intervalId!);

    notice({
      type: "SUCCESS",
      message: "이름 쓰기 성공!",
    });
    localStorage.setItem("name", Hangul.assemble(name.split("")));
    navigate("../birthday");
  };

  return (
    <main className={classes.section}>
      <header className={classes.header}>
        <h2>이름을 입력하세요</h2>
        <div className={classes.title}>
          <input type="text" value={Hangul.assemble(name.split(""))} readOnly />
          <div>
            <button
              className="btn-flat"
              onClick={() => setName(name.slice(0, -1))}
            >
              Backspace
            </button>
            <button
              className="btn-flat"
              onClick={() => {
                if (name.trim() === "") {
                  notice({ message: "이름이 비었어요~", type: "ERROR" });
                  return;
                }
                let newName = shuffle(
                  Hangul.assemble(name.split("")).split("")
                ).join("");
                while (Hangul.disassembleToString(newName) === name) {
                  newName = shuffle(
                    Hangul.assemble(name.split("")).split("")
                  ).join("");
                }
                setName(Hangul.disassembleToString(newName));
              }}
            >
              이름 글자 섞기
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
        <img src={"../basket.png"} alt="basket" />
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
