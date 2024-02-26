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
  isHomeTrue?: boolean;
  isBoxTrue?: boolean;
  isLostTrue?: boolean;
  isBoardTrue?: boolean;
  isProfileTrue?: boolean;
  children?: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  isHomeTrue,
  isBoxTrue,
  isLostTrue,
  isBoardTrue,
  isProfileTrue,
  children,
}) => {
  let iconHome;
  let iconBox;
  let iconLost;
  let iconBoard;
  let iconProfile;
  let homeLogo;

  if (isHomeTrue !== undefined) {
    if (isHomeTrue) {
      iconHome = <img src={icon_home_true} alt="홈 아이콘" />;
      homeLogo = <img src={LOGOTYPE_small_true} alt="찾아줘" />;
    } else {
      iconHome = <img src={icon_home_false} alt="홈 아이콘" />;
      homeLogo = <img src={LOGOTYPE_small_false} alt="찾아줘" />;
    }
  }

  if (isBoxTrue !== undefined) {
    if (isBoxTrue) {
      iconBox = <img src={icon_box_true} alt="홈 아이콘" />;
    } else {
      iconBox = <img src={icon_box_false} alt="홈 아이콘" />;
    }
  }

  if (isLostTrue !== undefined) {
    if (isLostTrue) {
      iconLost = <img src={icon_lost_true} alt="홈 아이콘" />;
    } else {
      iconLost = <img src={icon_lost_false} alt="홈 아이콘" />;
    }
  }

  if (isBoardTrue !== undefined) {
    if (isBoardTrue) {
      iconBoard = <img src={icon_board_true} alt="홈 아이콘" />;
    } else {
      iconBoard = <img src={icon_board_false} alt="홈 아이콘" />;
    }
  }

  if (isProfileTrue !== undefined) {
    if (isProfileTrue) {
      iconProfile = <img src={icon_profile_true} alt="홈 아이콘" />;
    } else {
      iconProfile = <img src={icon_profile_false} alt="홈 아이콘" />;
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
      <p className="font-OAGothic -tracking-0.3px text-center text-10px">
        {children}
      </p>
    </div>
  );
};

export default NavigationItem;
