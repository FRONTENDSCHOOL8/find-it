const IconDoubleCheck = ({ color = 'black' }) => {
  return (
    <span
      className="whitespace-nowrap text-10px leading-8 "
      style={{ color: `${color}` }}
    >
      중복확인
    </span>
  );
};

export default IconDoubleCheck;
