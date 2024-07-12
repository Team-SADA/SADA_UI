import { useNavigate } from "react-router";
import classes from "./name_page.module.scss";
import {useEffect, useState} from "react";

const DEBUG = true;

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
].join("").split(""); // 135 = 15 * 9 characters + 1

function shuffle(array: any[]) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
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

    const submitHandler = () => {
        // Needs additional conditions
        navigate("/birthday");
    };

    const [mouseX, setMouseX] = useState(window.innerWidth / 2);
    const [charQueue, setCharQueue] = useState<string[]>(nameChars);
    const [newCharIndex, setNewCharIndex] = useState(0);

    const randomLeft = () => Math.random() * window.innerWidth * 0.6;

    const createNewBlock = (): Block => {
        if (newCharIndex >= charQueue.length)
            return {char: "", left: 0};
        const data = charQueue[newCharIndex];
        setNewCharIndex(newCharIndex + 1);
        return {char: data, left: randomLeft()};
    };

    const [blockList, setBlockList] = useState<Block[]>([]);

    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            if (DEBUG) console.log('load')
            setCharQueue(shuffle(nameChars));
            document.addEventListener('mousemove', event => setMouseX(event.clientX));
        }
        return () => {ignore = true;}
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const newBlock = createNewBlock();
            if (DEBUG) console.log(newCharIndex, charQueue, newBlock)
            if (newBlock.char !== "") setBlockList([...blockList, newBlock]);
        }, 300);
    }, [charQueue, newCharIndex]);

    return (
        <section>
            <div className={classes.header}>
                <h2>이름을 입력하세요</h2>
                <input type="text" value={"123"} readOnly={true}/>
                <div className={classes.description}>
                    바구니에 글자를 담아보아요.
                    글자 순서는 상관없어요.
                    같은 글자는 두 번 다시 나타나지 않아요.
                    글자를 놓쳤다면... 안타까운 거죠
                </div>
                <button className="btn-flat" onClick={submitHandler}>
                    넘어가기
                </button>
            </div>
            <div className={classes.nameTable}>
                {blockList.map(block => (
                    <span className={classes.line} style={{left: block.left}}>
                        {block.char}
                    </span>
                ))}
            </div>
            <div className={classes.basket} style={{left: mouseX - 60}}>
                <img src={"./basket.png"} alt="basket"/>
                <button type="button" className={classes.button1} onClick={() => {
                }}>
                    입력
                </button>
                <button type="button" className={classes.button2} onClick={() => {
                }}>
                    버리기
                </button>
            </div>
        </section>
    )
}
