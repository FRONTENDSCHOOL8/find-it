import box from '@/assets/missingbox.svg';

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img src={box} alt="404 물음표 박스" />
      <span className="pt-40px text-16px text-gray-700">
        요청하신 페이지를 찾을 수 없어요.
      </span>
    </div>
  );
};

export default NotFound;
