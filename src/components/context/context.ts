import { createContext } from "react";

export type GlobalContent = {
  studentNumber: string;
  setStudentNumber: (c: string) => void;
  activateTime: () => void;
  stopTime: () => void;
  goBack: () => void;
};

const GlobalContext = createContext<GlobalContent>({
  studentNumber: "",
  setStudentNumber: () => {},
  activateTime: () => {},
  stopTime: () => {},
  goBack: () => {},
});

export default GlobalContext;
