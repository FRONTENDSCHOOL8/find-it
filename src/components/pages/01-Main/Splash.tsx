import logo from '@/assets/logo.svg';

const Splash = () => {
  return (
    <div className="flex	h-screen w-full items-center justify-center bg-gradient-to-br from-white to-blue-100">
      <img src={logo} alt="찾아줘 메인 로고" className="pb-5" />
    </div>
  );
};

export default Splash;
