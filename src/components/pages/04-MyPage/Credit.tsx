import Header from '../../Header/Header';

const Main = () => {
  return (
    <div className="w-375px px-30px">
      <ul className="mt-51px flex flex-col gap-24px">
        <li className="transition-all duration-300 hover:rounded hover:bg-gray-100">
          <a
            href="https://github.com/ksyee"
            className="flex flex-col gap-3 px-10px py-2"
          >
            <p className="text-18px">SEONYOUNG KANG</p>
            <p className="text-12px text-gray-400">github@ksyee</p>
          </a>
        </li>
        <li className="transition-all duration-300 hover:rounded hover:bg-gray-100">
          <a
            href="https://github.com/bellori729"
            className="flex flex-col gap-3 px-10px py-2"
          >
            <p className="text-18px">JONGDEOK KIM</p>
            <p className="text-12px text-gray-400">github@bellori729</p>
          </a>
        </li>
        <li className="transition-all duration-300 hover:rounded hover:bg-gray-100">
          <a
            href="https://github.com/zooyaam"
            className="flex flex-col gap-3 px-10px py-2"
          >
            <p className="text-18px">YUNJOO CHO</p>
            <p className="text-12px text-gray-400">github@zooyaam</p>
          </a>
        </li>
        <li className="transition-all duration-300 hover:rounded hover:bg-gray-100">
          <a
            href="https://www.instagram.com/jujung.hyn/"
            className="flex flex-col gap-3 px-10px py-2"
          >
            <p className="text-18px">HYUNJU JUNG</p>
            <p className="text-12px text-gray-400">instagram@jujung.hyn</p>
          </a>
        </li>
      </ul>
    </div>
  );
};

const Credit = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <Header isShowPrev={true} children="만든 사람들" empty={true} />
      <Main />
    </div>
  );
};

export default Credit;
