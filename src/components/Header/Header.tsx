import icon_prev from '@/assets/icons/icon_prev.svg';
import LOGO_SYMBOL from '@/assets/icons/LOGO_SYMBOL.svg';
import LOGOTYPE from '@/assets/icons/LOGOTYPE_true.svg';
import icon_search from '@/assets/icons/icon_search.svg';

import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';


interface HeaderProps {
  isShowLogo?: boolean;
  isShowPrev?: boolean;
  isShowSymbol?: boolean;
  isShowSearch?: boolean;
  isShowSubmit?: boolean;
  empty?: boolean; // 헤더 영역에 2개 요소만 사용 시 해당 prop 전달 필요
  link?: string;
  customStyle?: string;
  children?: string;
}

type ElementType =
  | string
  | number
  | boolean
  | JSX.Element
  | Iterable<ReactNode>;

const Header: React.FC<HeaderProps> = ({
  isShowLogo,
  isShowPrev,
  isShowSymbol,
  isShowSearch,
  isShowSubmit,
  empty,
  link,
  customStyle,
  children,
}) => {
  let homeLogo: ElementType;
  let symbolLogo: ElementType;
  let prevIcon: ElementType;
  let searchIcon: ElementType;
  let paragraph: ElementType;
  let submitButton: ElementType;
  let emptyBox: ElementType;

  const defaultStyle = 'h-26px flex w-375px items-center justify-around';

  const navigate = useNavigate();

  const handlePreviousPage = () => {
    navigate(-1);
  };

  if (isShowLogo !== undefined) {
    if (isShowLogo) {
      homeLogo = (
        <Link to="/">
          <img src={LOGOTYPE} alt="찾아줘!" />
        </Link>
      );
    } else {
      return homeLogo;
    }
  }

  if (isShowSymbol !== undefined) {
    if (isShowSymbol) {
      symbolLogo = (
        <Link to="/">
          <img src={LOGO_SYMBOL} alt="메인으로" />
        </Link>
      );
    } else {
      return symbolLogo;
    }
  }

  if (isShowPrev !== undefined) {
    if (isShowPrev) {
      prevIcon = (
        <button onClick={handlePreviousPage}>
          <img src={icon_prev} alt="이전으로" />
        </button>
      );
    } else {
      return prevIcon;
    }
  }

  if (isShowSearch !== undefined) {
    if (isShowSearch) {
      searchIcon = (

        <Link to={link} onClick={handlePreviousPage}>

          <img src={icon_search} alt="검색하기" />
        </Link>
      );
    } else {
      return searchIcon;
    }
  }

  if (isShowSubmit !== undefined) {
    if (isShowSubmit) {
      submitButton = (
        <button type="submit" className="text-primary">
          완료
        </button>
      );
    } else {
      submitButton = (
        <button type="submit" disabled className="text-gray-400">
          완료
        </button>
      );
    }
  }

  if (children !== undefined) {
    paragraph = <p className="text-20px">{children}</p>;
  }

  if (empty !== undefined) {
    emptyBox = <span className="h-21px w-21px"></span>;
  }

  return (
    <header className="py-20px">
      <div className={`${defaultStyle} ${customStyle}`}>
        {prevIcon}
        {symbolLogo}
        {paragraph}
        {homeLogo}
        {searchIcon}
        {submitButton}
        {emptyBox}
      </div>
    </header>
  );
};

export default Header;
