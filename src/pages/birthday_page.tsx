import { useNavigate } from "react-router";

const BirthdayPage = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/email");
  };

  return (
    <main>
      <h1>
        <img src="logo.png" alt="" />
        생일
      </h1>
      <button className="btn-flat" onClick={onSubmit}>
        넘어가기
      </button>
    </main>
  );
};

export default BirthdayPage;
