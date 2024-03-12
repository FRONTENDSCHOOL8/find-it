import icon_board_true from '@/assets/navigation/icon_board_true.svg';
import icon_board_false from '@/assets/navigation/icon_board_false.svg';
import icon_box_true from '@/assets/navigation/icon_box_true.svg';
import icon_box_false from '@/assets/navigation/icon_box_false.svg';
import icon_home_true from '@/assets/navigation/icon_home_true.svg';
import icon_home_false from '@/assets/navigation/icon_home_false.svg';
import icon_lost_true from '@/assets/navigation/icon_lost_true.svg';
import icon_lost_false from '@/assets/navigation/icon_lost_false.svg';
import icon_profile_true from '@/assets/navigation/icon_profile_true.svg';
import icon_profile_false from '@/assets/navigation/icon_profile_false.svg';
import { Link } from 'react-router-dom';

interface NavigationItemProps {
  isHomeActive?: boolean;
  isBoxActive?: boolean;
  isLostActive?: boolean;
  isBoardActive?: boolean;
  isProfileActive?: boolean;
  children?: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  isHomeActive,
  isBoxActive,
  isLostActive,
  isBoardActive,
  isProfileActive,
  children,
}) => {
  let iconHome;
  let iconBox;
  let iconLost;
  let iconBoard;
  let iconProfile;
  let homeLogo;
  let paragraph;

  const PARAGRAPH_FALSE_STYLE =
    'font-OAGothic -tracking-0.3px text-center text-10px text-gray-700';
  const PARAGRAPH_TRUE_STYLE =
    'font-OAGothic -tracking-0.3px text-center text-10px text-primary';

  if (isHomeActive !== undefined) {
    if (isHomeActive) {
      iconHome = <img src={icon_home_true} alt="홈 아이콘" />;
      paragraph = <p className={PARAGRAPH_TRUE_STYLE}>{children}</p>;
    } else {
      iconHome = <img src={icon_home_false} alt="홈 아이콘" />;
      paragraph = <p className={PARAGRAPH_FALSE_STYLE}>{children}</p>;
    }
  }

  if (isBoxActive !== undefined) {
    if (isBoxActive) {
      iconBox = <img src={icon_box_true} alt="홈 아이콘" />;
      paragraph = <p className={PARAGRAPH_TRUE_STYLE}>{children}</p>;
    } else {
      iconBox = <img src={icon_box_false} alt="홈 아이콘" />;
      paragraph = <p className={PARAGRAPH_FALSE_STYLE}>{children}</p>;
    }
  }

  if (isLostActive !== undefined) {
    if (isLostActive) {
      iconLost = <img src={icon_lost_true} alt="홈 아이콘" />;
      paragraph = <p className={PARAGRAPH_TRUE_STYLE}>{children}</p>;
    } else {
      iconLost = <img src={icon_lost_false} alt="홈 아이콘" />;
      paragraph = <p className={PARAGRAPH_FALSE_STYLE}>{children}</p>;
    }
  }

  if (isBoardActive !== undefined) {
    if (isBoardActive) {
      iconBoard = <img src={icon_board_true} alt="홈 아이콘" />;
      paragraph = <p className={PARAGRAPH_TRUE_STYLE}>{children}</p>;
    } else {
      iconBoard = <img src={icon_board_false} alt="홈 아이콘" />;
      paragraph = <p className={PARAGRAPH_FALSE_STYLE}>{children}</p>;
    }
  }

  if (isProfileActive !== undefined) {
    if (isProfileActive) {
      iconProfile = <img src={icon_profile_true} alt="홈 아이콘" />;
      paragraph = <p className={PARAGRAPH_TRUE_STYLE}>{children}</p>;
    } else {
      iconProfile = <img src={icon_profile_false} alt="홈 아이콘" />;
      paragraph = <p className={PARAGRAPH_FALSE_STYLE}>{children}</p>;
    }
  }

  return (
    <div className="flex h-60px w-54px flex-col items-center justify-center gap-5px">
      <div className="flex h-26px w-26px flex-col items-center justify-center">
        <Link to="/">{iconHome}</Link>
        <Link to="/getlist">{iconBox}</Link>
        <Link to="/lostlist">{iconLost}</Link>
        <Link to="/postlist">{iconBoard}</Link>
        <Link to="/mypageentry">{iconProfile}</Link>
        <Link to="/">{homeLogo}</Link>
      </div>
      {paragraph}
    </div>
  );
};

export default NavigationItem;
