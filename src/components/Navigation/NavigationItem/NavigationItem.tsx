import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface NavigationItemProps {
  isActive?: boolean;
  trueIcon: string;
  falseIcon: string;
  children?: ReactNode;
  link: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  isActive,
  trueIcon,
  falseIcon,
  children,
  link,
}) => {
  const PARAGRAPH_FALSE_STYLE =
    'font-OAGothic -tracking-0.3px text-center text-10px text-gray-700';
  const PARAGRAPH_TRUE_STYLE =
    'font-OAGothic -tracking-0.3px text-center text-10px text-primary';

  return (
    <div className="flex h-60px w-54px flex-col items-center justify-center gap-5px">
      <Link to={link}>
        <img src={isActive ? trueIcon : falseIcon} alt={`${children} 아이콘`} />
      </Link>
      <p className={isActive ? PARAGRAPH_TRUE_STYLE : PARAGRAPH_FALSE_STYLE}>
        {children}
      </p>
    </div>
  );
};

export default NavigationItem;
