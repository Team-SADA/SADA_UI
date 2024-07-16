import { useNavigate } from "react-router";
import classes from "./name_page.module.scss";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../components/context/context";

const DEBUG = false;

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

function shuffle(array: any[]) {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  if (DEBUG) console.log(array.join(""));
  return array;
}

interface Block {
  char: string;
  left: number;
}

export default function NamePage() {
  const navigate = useNavigate();

  const { studentNumber } = useContext(GlobalContext);

  const submitHandler = () => {
    clearTimeout(timeoutId!);
    console.log(studentNumber);
    console.log(json[studentNumber]);
    navigate("/birthday");
  };

  const [mouseX, setMouseX] = useState(window.innerWidth / 2);
  const [charQueue, setCharQueue] = useState<string[]>(nameChars);
  const [newCharIndex, setNewCharIndex] = useState(0);
  const [listener, setListener] = useState<EventListener | null>(null);
  const [name, setName] = useState<(string | null)[]>([null, null, null]);

  const [collide, setCollide] = useState(false);

  const shuffleName = () => {
    setName(shuffle(name));
  }

  const randomLeft = () => Math.random() * window.innerWidth * 0.5;

  const createNewBlock = (): Block => {
    // if (newCharIndex >= charQueue.length) return { char: "", left: 0 };
    const data = charQueue[newCharIndex % charQueue.length];
    setNewCharIndex(newCharIndex % charQueue.length + 1);
    return { char: data, left: randomLeft() };
  };

  const [blockList, setBlockList] = useState<Block[]>([]);
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [intervalId, setIntervalId] = useState<ReturnType<
      typeof setInterval
  > | null>(null);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (DEBUG) console.log("load");
      setCharQueue(shuffle(nameChars));
      document.addEventListener("mousemove", (event) => setMouseX(event.clientX));
    }
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    setTimeoutId(
      setTimeout(() => {
        const newBlock = createNewBlock();
        if (DEBUG) console.log(newCharIndex, newBlock);
        if (newBlock.char !== "") setBlockList([...blockList, newBlock]);
      }, 300)
    );
  }, [charQueue, newCharIndex]);

  useEffect(() => {
    clearInterval(intervalId!);
    setIntervalId(
      setInterval(() => {
        if (collide) setCollide(false);
        const collideIndex = (newCharIndex - 4 + charQueue.length) % charQueue.length;
        if (DEBUG) console.log('collide', collideIndex);
        const collidedBlock = blockList[collideIndex];
        if (collidedBlock !== undefined) {
          const basketRelativeBlockX = collidedBlock.left - mouseX + window.innerWidth / 4;
          console.log('block: ', collidedBlock.char, basketRelativeBlockX);
          if (-60 <= basketRelativeBlockX && basketRelativeBlockX <= 60) {
            if (!name.includes(collidedBlock.char)) {
              setName([...name.slice(1), collidedBlock.char]);
              setCollide(true);
            }
          }
        }
      }, 10)
    );
  }, [mouseX, newCharIndex]);

  return (
    <section className={classes.section}>
      <div className={classes.header}>
        <h2>이름을 입력하세요</h2>
        <span>
          {name.map(char => (
            <span>{char !== null ? char : '_'} </span>
          ))}
        </span>
        <div className={classes.description}>
          자신에 이름에 포함된 글자를 바구니에 순서 상관없이 담아보아요!
          바구니에는 글자를 최대 5개 넣을 수 있어요!
          글자를 모두 담으면 바구니에서 글자를 선택해서 이름을 입력하세요!
          바구니가 꽉 찼을 때 글자를 새로 담으면 이전 글자는 넘쳐서 떨어집니다... 조심하세요!
        </div>
        <button className="btn-flat" onClick={shuffleName}>
          이름 섞기
        </button>
        <button className="btn-flat" onClick={submitHandler}>
          넘어가기
        </button>
      </div>
      <div className={classes.nameTable}>
        {blockList.map((block) => (
          <span className={classes.line} style={{ left: block.left }}>
            {block.char}
          </span>
        ))}
      </div>
      <div className={classes.basket} style={{left: mouseX - 60, ...(collide ? {backgroundColor: 'red'} : {})}}>
        <img src={"./basket.png"} alt="basket" />
        {/*
        <button type="button" className={classes.button1} onClick={() => {}}>
          입력
        </button>
        <button type="button" className={classes.button2} onClick={() => {}}>
          버리기
        </button>
        */}
      </div>
    </section>
  );
}
