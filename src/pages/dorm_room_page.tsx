import { useNavigate } from "react-router";
import classes from "./dorm_room_page.module.scss";
import { Unity, useUnityContext } from "react-unity-webgl";

const DormRoomPage = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/phone-number");
  };
  
  const { unityProvider } = useUnityContext({
    loaderUrl: "dorm_unity_build/__build.loader.js",
    dataUrl: "dorm_unity_build/webgl.data",
    frameworkUrl: "dorm_unity_build/build.framework.js",
    codeUrl: "dorm_unity_build/build.wasm"
  });

  return (
    <main>
      기숙사 호실
      <Unity className={classes.unity} unityProvider={unityProvider} />
      <button className="btn-flat" onClick={onSubmit}>
        asdfasdfasdfsadf
      </button>
    </main>
  );
};

export default DormRoomPage;
