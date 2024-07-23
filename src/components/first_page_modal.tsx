import { useContext, useEffect, useRef } from "react";
import { useNotification } from "./notification/NotificationProvider";

import { CSSTransition } from "react-transition-group";
import Backdrop from "./UI/Backdrop";
import Portal from "./UI/Portal";

import classes from "./first_page_modal.module.scss";
import { useNavigate } from "react-router";
import GlobalContext from "./context/context";

type PropsType = {
  show: boolean;
  close: () => void;
};

const FirstPageModal = ({ show, close }: PropsType) => {
  const ref = useRef<HTMLDivElement>(null);

  const { activateTime } = useContext(GlobalContext);

  const navigate = useNavigate();
  const notice = useNotification();

  const nextPageHandler = (type: "STUDENT" | "NOT_STUDENT") => {
    notice({ type: "SUCCESS", message: "반갑습니다!" });
    activateTime();
    navigate(type === "STUDENT" ? "student-number" : "non-student/name");
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
              <h1>외부인 확인</h1>
              <span onClick={() => close()}>X</span>
            </div>
            <div className={classes.main}>
              <p>시작하기 전에! 당신은 경기북 학생인가요?</p>
            </div>
            <div className={classes.check}>
              <button
                className="btn"
                onClick={() => nextPageHandler("NOT_STUDENT")}
              >
                아니오
              </button>
              <button
                className="btn-flat"
                onClick={() => nextPageHandler("STUDENT")}
              >
                예
              </button>
            </div>
          </div>
        </CSSTransition>
      </Portal>
    </>
  );
};

export default FirstPageModal;
