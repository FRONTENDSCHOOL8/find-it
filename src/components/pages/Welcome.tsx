import ButtonVariable from '@/components/common/molecule/ButtonVariable';
import welcomeImg from '@/assets/img_welcome.png';
const Welcome = () => {
  const handleButton = () => {
    alert('버튼 클릭');
  };
  return (
    <div className="mt-120px flex flex-col items-center ">
      <h1>환영합니다!</h1>
      <img
        className="mb-100px mt-20px w-300px"
        src={welcomeImg}
        alt="가입환영 이미지"
      />
      <ButtonVariable
        buttonText="내 분실물 찾으러가기"
        variant="submit"
        onClick={handleButton}
      />
    </div>
  );
};

export default Welcome;
