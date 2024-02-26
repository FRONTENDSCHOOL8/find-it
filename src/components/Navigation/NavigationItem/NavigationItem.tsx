import icon_board_true from '@/assets/navigation/icon_board_true.svg';
import icon_board_false from '@/assets/navigation/icon_board_false.svg';
import icon_box_true from '@/assets/navigation/icon_box_true.svg';
import icon_box_false from '@/assets/navigation/icon_box_false.svg';
import icon_home_true from '@/assets/navigation/icon_home_true.svg';
import icon_home_false from '@/assets/navigation/icon_home_false.svg';
import LOGOTYPE_small_true from '@/assets/icons/LOGOTYPE_small_true.svg';
import LOGOTYPE_small_false from '@/assets/icons/LOGOTYPE_small_false.svg';
import icon_lost_true from '@/assets/navigation/icon_lost_true.svg';
import icon_lost_false from '@/assets/navigation/icon_lost_false.svg';
import icon_profile_true from '@/assets/navigation/icon_profile_true.svg';
import icon_profile_false from '@/assets/navigation/icon_profile_false.svg';

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

  const PARAGRAPH_FALSE_STYLE = "font-OAGothic -tracking-0.3px text-center text-10px text-gray-700";
  const PARAGRAPH_TRUE_STYLE = "font-OAGothic -tracking-0.3px text-center text-10px text-primary";

  if (isHomeActive !== undefined) {
    if (isHomeActive) {
      iconHome = <img src={icon_home_true} alt="홈 아이콘" />;
      homeLogo = <img src={LOGOTYPE_small_true} alt="찾아줘" />;
    } else {
      iconHome = <img src={icon_home_false} alt="홈 아이콘" />;
      homeLogo = <img src={LOGOTYPE_small_false} alt="찾아줘" />;
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
    <div className="flex h-44px w-48px flex-col content-between items-center justify-center gap-7px">
      <a
        href="./"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {iconHome}
        {iconBox}
        {iconLost}
        {iconBoard}
        {iconProfile}
      </a>
      {homeLogo}
      {paragraph}
    </div>
  );
};

export default NavigationItem;
