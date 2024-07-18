import classes from "./phone_number_page.module.scss";
import { useState, useEffect } from "react";
import { Knob } from "primereact/knob";
import PhoneNumberModal from "../components/phone_number_modal";

const PhonePage = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [disabledIncrementBtn2, setDisabledIncrementBtn2] = useState(false);
  const [disabledIncrementBtn3, setDisabledIncrementBtn3] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue2((v) => {
        setDisabledIncrementBtn2(v === 9998);
        return v > 0 ? v - 1 : 0;
      });
      setValue3((v) => {
        setDisabledIncrementBtn3(v === 9998);
        return v > 0 ? v - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const increment2 = () => {
    setValue2(value2 + 1);
    setDisabledIncrementBtn2(value2 === 9998);
  };

  const increment3 = () => {
    setValue3(value3 + 1);
    setDisabledIncrementBtn3(value3 === 9998);
  };

  const submitHandler = () => {
    setShowModal(true);

    setPhoneNumber(
      "010-" +
        "0".repeat(4 - value2.toString().length) +
        value2 +
        "-" +
        "0".repeat(4 - value3.toString().length) +
        value3
    );
  };

  return (
    <>
      <PhoneNumberModal
        show={showModal}
        close={() => {
          setShowModal(false);
        }}
        phoneNumber={phoneNumber}
      />
      <main className={classes.main}>
        <h1>
          <img src="logo.png" alt="" />
          전화번호
        </h1>
        <p>
          다이얼을 돌려 전화번호를 입력하세요! <br></br>다이얼 속의 번호는
          자동으로 감소하고, 손으로 다이얼을 클릭해 돌려 위치를 맞춘 다음 (+)
          버튼으로 전화번호를 만드세요!
          <br></br>
          <br></br>
          진철하게도 첫 다이얼은 +82 10으로 맞춰져 있네요~
        </p>
        <section>
          <div className="card">
            <div className="grid formgrid text-center">
              <div className="field col-12 md:col-4">
                <Knob
                  size={150}
                  value={10}
                  min={0}
                  max={100}
                  valueTemplate={"{value}"}
                  valueColor={"#E85BA1"}
                  rangeColor={"#C2D9EC"}
                />
              </div>
            </div>
          </div>
          <div className="card">
            <div className="grid formgrid text-center">
              <div className="field col-12 md:col-4">
                <Knob
                  size={150}
                  value={value2}
                  min={0}
                  step={5}
                  max={9999}
                  valueTemplate={"{value}"}
                  valueColor={"#E85BA1"}
                  rangeColor={"#C2D9EC"}
                  onChange={(e) => setValue2(e.value)}
                />
                <div className={classes.control}>
                  <button onClick={increment2} disabled={disabledIncrementBtn2}>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="grid formgrid text-center">
              <div className="field col-12 md:col-4">
                <Knob
                  size={150}
                  value={value3}
                  min={0}
                  step={5}
                  max={9999}
                  valueTemplate={"{value}"}
                  valueColor={"#E85BA1"}
                  rangeColor={"#C2D9EC"}
                  onChange={(e) => setValue3(e.value)}
                />
                <div className={classes.control}>
                  <button onClick={increment3} disabled={disabledIncrementBtn3}>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <p>이 번호를 바탕으로 선물이 전송될 예정이니 신중히 입력해 주세요~</p>
        <div className={classes.submit}>
          <span>정확한 타이밍을 맞춰 버튼을 누르세요!</span>
          <button className="btn-flat" onClick={submitHandler}>
            넘어가기
          </button>
        </div>
      </main>
    </>
  );
};

export default PhonePage;
