import { useNavigate } from "react-router";
import classes from "./name_page.module.scss";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../components/context/context";
import {useNotification} from "../components/notification/NotificationProvider";

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
  const notice = useNotification();
  const { studentNumber } = useContext(GlobalContext);

  const submitHandler = () => {
    if (name !== json[studentNumber]) {
      notice({
        type: "SUCCESS",
        message: "학번과 이름이 안 맞네요~",
      });
      return;
    }
    clearTimeout(timeoutId!);
    console.log(studentNumber);
    console.log(json[studentNumber]);
    notice({
      type: "SUCCESS",
      message: "이름 쓰기 성공!",
    });
    navigate("/birthday");
  };

  const [mouseX, setMouseX] = useState(window.innerWidth / 2);
  const [charQueue, setCharQueue] = useState<string[]>(nameChars);
  const [newCharIndex, setNewCharIndex] = useState(0);
  const [basketChars, setBasketChars] = useState<(string | null)[]>([null]);
  const [name, setName] = useState<string>("");

  const [collide, setCollide] = useState(false);

  const randomLeft = () => Math.random() * window.innerWidth * 0.5;

  const createNewBlock = (): Block => {
    // if (newCharIndex >= charQueue.length) return { char: "", left: 0 };
    const data = charQueue[newCharIndex % charQueue.length];
    setNewCharIndex((newCharIndex + 1) % charQueue.length);
    let left = randomLeft();
    while (
        blockList[(newCharIndex - 1) % charQueue.length] !== undefined &&
        Math.abs(left - blockList[(newCharIndex - 1) % charQueue.length].left) < 200
        )
      left = randomLeft();
    return { char: data, left: left };
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
            if (!basketChars.includes(collidedBlock.char)) {
              setBasketChars([...basketChars.slice(1), collidedBlock.char]);
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
        <div className={classes.title}>
          <h2>이름을 입력하세요</h2>
          <input type="text" value={name} readOnly/>
          <button className="btn-flat" onClick={() => setName(name.slice(0, -1))}>
            Backspace
          </button>
          <button className="btn-flat" onClick={() => setName(shuffle(name.split("")).join(""))}>
            이름 글자 섞기
          </button>
          <button className="btn-flat" onClick={submitHandler}>
            넘어가기
          </button>
        </div>
        <div className={classes.description}>
          자신에 이름에 포함된 글자를 바구니에 순서 상관없이 담아보아요!<br/>
          바구니에는 글자 하나만 넣을 수 있어요!<br/>
          입력 버튼을 눌러 바구니에 담은 글자로 이름을 입력하세요!
        </div>
      </div>
      <div className={classes.nameTable}>
        {blockList.map((block) => (
          <span className={classes.line} style={{ left: block.left }}>
            {block.char}
          </span>
        ))}
      </div>
      <div className={classes.basket} style={{left: mouseX - 60}}>
        <img src={"./basket.png"} alt="basket"/>
        <div>
          {basketChars.map(char => (
              <span style={collide ? {color: '#6473E6'} : {}}>{char !== null ? char : '_'} </span>
          ))}
        </div>
        <button type="button" className={`btn-flat ${classes.button1}`} onClick={() => {
          setName(name + basketChars[0]);
          setBasketChars([...basketChars.slice(1)]);
        }}>
          입력
        </button>
      </div>
    </section>
  );
}
