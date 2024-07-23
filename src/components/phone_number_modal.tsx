import { useEffect, useRef } from "react";
import { useNotification } from "./notification/NotificationProvider";

import { CSSTransition } from "react-transition-group";
import Backdrop from "./UI/Backdrop";
import Portal from "./UI/Portal";

import classes from "./phone_number_modal.module.scss";
import { useNavigate } from "react-router";

type PropsType = {
  phoneNumber: string;
  show: boolean;
  close: () => void;
};

const PhoneNumberModal = ({ phoneNumber, show, close }: PropsType) => {
  const ref = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const notice = useNotification();

  const verificationHandler = async () => {
    notice({
      type: "SUCCESS",
      message: "입력 완료! 수고했어요~",
    });

    localStorage.setItem("phone-number", phoneNumber);
    navigate("/last-page");
  };

  useEffect(() => {
    window.onkeydown = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };

    return () => {
      window.onkeydown = null;
    };
  }, [close]);

  return (
    <>
      <Backdrop show={show} close={() => close()} />
      <Portal query=".overlays">
        <CSSTransition
          nodeRef={ref}
          mountOnEnter
          unmountOnExit
          in={show}
          timeout={250}
          classNames={{
            enterActive: classes.open,
            exitActive: classes.close,
          }}
        >
          <div ref={ref} className={classes.modal}>
            <div className={classes.control}>
              <h1>전화번호 확인</h1>
              <span onClick={() => close()}>X</span>
            </div>
            <div className={classes.main}>
              <div className={classes.center}>
                <span>{phoneNumber}</span>
              </div>
              <p>
                이게 당신의 번호가 맞습니까? 상품은 전화번호를 바탕으로
                전달되오니 신중하게 입력해주세요~
              </p>
            </div>
            <div className={classes.check}>
              <button className="btn" onClick={() => close()}>
                아니오
              </button>
              <button className="btn-flat" onClick={verificationHandler}>
                예
              </button>
            </div>
          </div>
        </CSSTransition>
      </Portal>
    </>
  );
};

export default PhoneNumberModal;
