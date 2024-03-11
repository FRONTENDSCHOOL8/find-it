import ButtonVariable from '@/components/common/molecule/ButtonVariable';
import welcomeImg from '@/assets/img_welcome.png';
const Welcome = () => {
  const handleButton = () => {
    window.location.href = '/';
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center ">
      <h1 className="text-22px">환영합니다!</h1>
      <img className="mt-30px w-300px" src={welcomeImg} alt="가입환영 이미지" />
      <div className="mt-60px w-334px">
        <ButtonVariable
          buttonText="내 분실물 찾으러가기"
          variant="submit"
          onClick={handleButton}
        />
      </div>
    </div>
  );
};

export default Welcome;
