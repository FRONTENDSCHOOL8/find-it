import logo from '@/assets/logo.svg';

const Splash = () => {
  return (
    <div className="flex h-667px w-375px items-center justify-center bg-gradient-to-br from-white to-blue-100">
      <img src={logo} alt="찾아줘 메인 로고" />
    </div>
  );
};

export default Splash;
