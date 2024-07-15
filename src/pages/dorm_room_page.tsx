import { useNavigate } from "react-router";

const DormRoomPage = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/phone-number");
  };

  return (
    <main>
      <h1>
        <img src="logo.png" alt="" />
        기숙사 호실
      </h1>
      <button className="btn-flat" onClick={onSubmit}>
        넘어가기
      </button>
    </main>
  );
};

export default DormRoomPage;
