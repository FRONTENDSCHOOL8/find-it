import { useState } from 'react';
import IconDelete from '@/components/common/atom/IconDelete';
import IconEyeOff from '@/components/SignIn/atom/IconEyeOff';
import IconEyeOn from '@/components/SignIn/atom/IconEyeOn';
import ButtonDoubleCheck from '@/components/SignIn/atom/ButtonDoubleCheck';

export const EyeToggle = ({ isShow }) => {
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

export const DeleteContent = ({ isShow }) => {
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
export const DoubleCheck = ({ isShow }) => {
  const buttonTest = () => {
    alert('중복확인 클릭 테스트');
  };
  if (isShow) {
    return (
      <button onClick={buttonTest}>
        <ButtonDoubleCheck />
      </button>
    );
  } else {
    return null;
  }
};
