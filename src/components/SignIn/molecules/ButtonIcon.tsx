import { IconDelete } from '@/components/SignIn/atom/IconDelete';
import { IconEyeOff } from '@/components/SignIn/atom/IconEyeOff';
import { IconEyeOn } from '@/components/SignIn/atom/IconEyeOn';

export const ButtonIcon = (props) => {
  const buttonTest = () => {
    alert('컴포넌트 분리');
  };
  const { iconName } = props;
  const iconMap = {
    delete: <IconDelete />,
    eyeoff: <IconEyeOff />,
    eyeon: <IconEyeOn />,
  };
  const renderIcon = iconMap[iconName] || undefined;

  return (
    <button className="mr-2.5 inline " onClick={buttonTest}>
      {renderIcon}
    </button>
  );
};
