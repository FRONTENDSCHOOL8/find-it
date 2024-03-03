import { useState } from 'react';
import IconDelete from '@/components/common/atom/IconDelete';
import IconEyeOff from '@/components/SignIn/atom/IconEyeOff';
import IconEyeOn from '@/components/SignIn/atom/IconEyeOn';
import IconDoubleCheck from '@/components/SignIn/atom/IconDoubleCheck';

interface IconProps {
  isShow: boolean;
}
export const DoubleCheck: React.FC<IconProps> = ({ isShow }) => {
  const buttonTest = () => {
    alert('중복확인 클릭 테스트');
  };
  if (isShow) {
    return (
      <button onClick={buttonTest}>
        <IconDoubleCheck />
      </button>
    );
  } else {
    return null;
  }
};
export const DeleteContent: React.FC<IconProps> = ({ isShow }) => {
  const buttonTest = () => {
    alert('삭제 클릭 테스트');
  };
  if (isShow) {
    return (
      <button onClick={buttonTest}>
        <IconDelete color="#4785ff" />
      </button>
    );
  } else {
    return null;
  }
};

export const EyeToggle: React.FC<IconProps> = ({ isShow }) => {
  const [isEyeOn, setIsEyeOn] = useState(false);
  const toggleEye = () => {
    setIsEyeOn(!isEyeOn);
  };

  if (isShow) {
    return (
      <>
        <button onClick={toggleEye}>
          {isEyeOn && <IconEyeOn />}
          {!isEyeOn && <IconEyeOff />}
        </button>
      </>
    );
  } else {
    return null;
  }
};

interface InputIconButtonProps {
  iconDoubleCheck: boolean;
  iconDelete: boolean;
  iconEyeToggle: boolean;
}
export const InputIconButton: React.FC<InputIconButtonProps> = ({
  iconDoubleCheck = false,
  iconDelete = false,
  iconEyeToggle = false,
}) => {
  return (
    <div className="flex gap-10px pr-12px">
      <DoubleCheck isShow={iconDoubleCheck} />
      <DeleteContent isShow={iconDelete} />
      <EyeToggle isShow={iconEyeToggle} />
    </div>
  );
};

export default InputIconButton;
