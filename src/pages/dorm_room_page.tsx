import { useNavigate } from "react-router";

const DormRoomPage = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/phone-number");
  };

  return (
    <main>
      기숙사 호실
      <button className="btn-flat" onClick={onSubmit}>
        asdfjaskdlfjaskfasjdfklasd
      </button>
    </main>
  );
};

export default DormRoomPage;
