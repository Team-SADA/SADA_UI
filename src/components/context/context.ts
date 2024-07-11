import { createContext } from "react";

export type GlobalContent = {
  studentNumber: string;
  setStudentNumber: (c: string) => void;
  activateTime: () => void;
  stopTime: () => void;
};

const GlobalContext = createContext<GlobalContent>({
  studentNumber: "",
  setStudentNumber: () => {},
  activateTime: () => {},
  stopTime: () => {},
});

export default GlobalContext;
