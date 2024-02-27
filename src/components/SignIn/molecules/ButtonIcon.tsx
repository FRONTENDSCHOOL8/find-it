import { IconDelete } from '@/components/SignIn/atom/IconDelete';
import { IconEyeOff } from '@/components/SignIn/atom/IconEyeOff';
import { IconEyeOn } from '@/components/SignIn/atom/IconEyeOn';
import { ButtonDoubleCheck } from '@/components/SignIn/atom/ButtonDoubleCheck';

export const ButtonIcon = ({ iconName }) => {
  const buttonTest = () => {
    alert('엑스,눈,중복확인 클릭 테스트');
  };
  const iconMap = {
    delete: <IconDelete />,
    eyeoff: <IconEyeOff />,
    eyeon: <IconEyeOn />,
    dubleCheck: <ButtonDoubleCheck />,
  };
  const renderIcon = iconMap[iconName];

  if (!iconMap || !renderIcon) {
    return null;
  }

  return (
    <button className="inline pr-2.5 " onClick={buttonTest}>
      {renderIcon}
    </button>
  );
};
