import classes from "./name.module.scss";


const nameChars = [
    "가감갑강건겸경고공곽관교구국권",
    "규균금기김나난남노다도동라랑로",
    "록류륜리린림마명묵문미민박방배",
    "백범변병보빈빛삭상서석선성세소",
    "손솔송수순승시신아안양엘연열영",
    "예오옥완요용우욱웅원유윤율은의",
    "이인일임장재전정제조종주준지진",
    "차찬창채천철청최태택하한함해허",
    "헌혁현형혜호홍환황효후훈휘흔희",
].join("").split("");  // 135 = 15 * 9 characters



export default function Name() {
    return (
        <section>
            <h2>여러분의 이름에 포함된 글자를 바구니에 담아보아요</h2>
            <div className={classes.description}>
                같은 글자는 두 번 다시 나타나지 않아요. 글자를 놓쳤다면 처음부터!!!
            </div>
            <div className={classes.nameTable}>
                {nameChars.map(char => (
                    <span className={classes.line}>
                        <button type="button" onMouseEnter={() => {}} key={char}>
                            {char}
                        </button>
                    </span>
                ))}
            </div>
            <div className={classes.basket}>
                <img src={"./basket.png"} alt="basket" width={120} height={90}/>
                <button type="button" onClick={() => {}}>
                    입력
                </button>
                <button type="button" onClick={() => {}}>
                    버리기
                </button>
            </div>
        </section>
    )
}
