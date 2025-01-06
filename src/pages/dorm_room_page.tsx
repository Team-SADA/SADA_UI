import { useNavigate } from "react-router";
import classes from "./dorm_room_page.module.scss";
import { Unity, useUnityContext } from "react-unity-webgl";
import {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNotification } from "../components/notification/NotificationProvider";
import Portal from "../components/UI/Portal";

const DormRoomPage = () => {
  const navigate = useNavigate();
  const notice = useNotification();

  const { unityProvider } = useUnityContext({
    loaderUrl: "dorm_unity_build/HaksulUnityBuild.loader.js",
    dataUrl: "dorm_unity_build/HaksulUnityBuild.data",
    frameworkUrl: "dorm_unity_build/HaksulUnityBuild.framework.js",
    codeUrl: "dorm_unity_build/HaksulUnityBuild.wasm",
  });
  const submitHandler = useCallback((e: Event) => {
    const { detail } = e as CustomEvent<{ roomNum: string }>;
    const { roomNum } = detail;
    // setDormRoom(roomNum);

    console.log(roomNum);
    notice({ type: "SUCCESS", message: "기숙사 호실 입력 완료!" });
    navigate("/phone-number");
  }, []);

  useEffect(() => {
    window.addEventListener("SendDormNumber", submitHandler);
    return () => {
      window.removeEventListener("SendDormNumber", submitHandler);
    };
  }, [window.addEventListener, window.removeEventListener, submitHandler]);

  return (
    <main className={classes.wrapper}>
      <h1>
        <img src="logo.png" alt=""/>
        기숙사 호실
      </h1>
      <Unity className={classes.unity} unityProvider={unityProvider}/>
    </main>
  );
};

export default DormRoomPage;
