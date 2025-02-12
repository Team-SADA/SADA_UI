import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.scss";

import NotificationProvider from "./components/notification/NotificationProvider";
import MyGlobalContext from "./components/context/context";
import { useState } from "react";

import FirstPage from "./pages/first_page";
import EmailPage from "./pages/email_page";
import NamePage from "./pages/name_page";
import StudentNumberPage from "./pages/student_number_page";
import BirthdayPage from "./pages/birthday_page";
import DormRoomPage from "./pages/dorm_room_page";
import PhoneNumberPage from "./pages/phone_number_page";
import LastPage from "./pages/last_page";

const secondsToMMSS = (seconds: number) => {
  // Calculate the minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Pad the remaining seconds with a leading zero if necessary
  const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

  // Return the formatted time
  return `${minutes}:${paddedSeconds}`;
};

export default function App() {
  const [studentNumber, setStudentNumber] = useState<string>("");
  const [time, setTime] = useState<number | null>(null);
  const [intervalId, setIntervalId] = useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const [isOver, setIsOver] = useState<boolean>(false);

  const activateTime = () => {
    setTime(0);
    setIntervalId(
      setInterval(() => {
        setTime((prevState) => (prevState as number) + 1);
        // localStorage.setItem("someVarKey", );
      }, 1000)
    );
  };

  const stopTime = () => {
    setIsOver(true);
    clearInterval(intervalId as ReturnType<typeof setInterval>);
  };

  return (
    <div className="overlays">
      {time !== null && (
        <div className={`time ${isOver && "center"}`}>
          클리어 타임: {secondsToMMSS(time)}
        </div>
      )}
      {/* <div className={`time center`}>클리어 타임: {secondsToMMSS(123)}</div> */}
      <MyGlobalContext.Provider
        value={{ studentNumber, setStudentNumber, activateTime, stopTime }}
      >
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<FirstPage />} />
              <Route path="student-number" element={<StudentNumberPage />} />
              <Route path="name" element={<NamePage />} />
              <Route path="birthday" element={<BirthdayPage />} />
              <Route path="email" element={<EmailPage />} />
              <Route path="dorm-room" element={<DormRoomPage />} />
              <Route path="phone-number" element={<PhoneNumberPage />} />
              <Route path="last-page" element={<LastPage />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </MyGlobalContext.Provider>
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
