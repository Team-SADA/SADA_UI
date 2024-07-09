import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmailPage from "./pages/email_page";
import Hello from "./pages/Hello";
import NamePage from "./pages/name_page";

import "./index.scss";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="email" element={<EmailPage />} />
        <Route path="name" element={<NamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
