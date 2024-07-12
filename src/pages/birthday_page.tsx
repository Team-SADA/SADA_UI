import { useNavigate } from "react-router";

const BirthdayPage = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/email");
  };

  return (
    <main>
      생일
      <button className="btn-flat" onClick={onSubmit}>
        넘어가기
      </button>
    </main>
  );
};

export default BirthdayPage;
