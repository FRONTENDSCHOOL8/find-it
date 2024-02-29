interface SelectCategoryListProps {
  title: string;
  dataList: string[];
}

const SelectCategoryList: React.FC<SelectCategoryListProps> = ({
  title = '아이템을 선택해주세요.',
  dataList,
}) => {
  const nomalColor = '#666';
  const selectedColor = '#4785ff';

  const checkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
    >
      <g clipPath="url(#clip0_676_3967)">
        <path
          d="M16.739 3.32326L6.37472 13.6868C6.30504 13.7567 6.22223 13.8122 6.13105 13.8501C6.03986 13.888 5.94209 13.9075 5.84335 13.9075C5.74461 13.9075 5.64684 13.888 5.55565 13.8501C5.46447 13.8122 5.38166 13.7567 5.31197 13.6868L1.30397 9.67501C1.23429 9.60505 1.15148 9.54954 1.0603 9.51166C0.969109 9.47379 0.87134 9.45429 0.7726 9.45429C0.673859 9.45429 0.576091 9.47379 0.484904 9.51166C0.393717 9.54954 0.310907 9.60505 0.241225 9.67501V9.67501C0.171267 9.74469 0.115758 9.8275 0.0778815 9.91869C0.0400053 10.0099 0.0205078 10.1076 0.0205078 10.2064C0.0205078 10.3051 0.0400053 10.4029 0.0778815 10.4941C0.115758 10.5853 0.171267 10.6681 0.241225 10.7378L4.25072 14.7465C4.67369 15.1687 5.24687 15.4058 5.84447 15.4058C6.44208 15.4058 7.01526 15.1687 7.43822 14.7465L17.8017 4.38526C17.8716 4.31559 17.927 4.23282 17.9648 4.14171C18.0026 4.05059 18.0221 3.95291 18.0221 3.85426C18.0221 3.75561 18.0026 3.65792 17.9648 3.56681C17.927 3.47569 17.8716 3.39292 17.8017 3.32326C17.732 3.2533 17.6492 3.19779 17.558 3.15991C17.4669 3.12204 17.3691 3.10254 17.2704 3.10254C17.1716 3.10254 17.0738 3.12204 16.9827 3.15991C16.8915 3.19779 16.8087 3.2533 16.739 3.32326Z"
          fill="#4785FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_676_3967">
          <rect width={18} height={18} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <div className="fixed inset-0	bg-[#00000045]">
      <ul className="z-1 absolute bottom-0 h-3/4 w-full overflow-auto rounded-t-40px bg-white px-40px pt-40px">
        <h3 className="pb-36px text-18px">{title}</h3>
        {dataList.map((item, index) => (
          <li
            className="flex items-center justify-between pb-20px"
            key={index}
            style={{ color: `${nomalColor}` }}
          >
            <a href="/">{item}</a>
            {checkIcon}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectCategoryList;
