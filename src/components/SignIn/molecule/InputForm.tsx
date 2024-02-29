import {
  DoubleCheck,
  DeleteContent,
  EyeToggle,
} from '@/components/SignIn/molecule/ButtonIcon';
import { AlertText } from '@/components/common/atom/AlertText';
import { useRef } from 'react';

export const InputForm = ({
  type = 'text',
  name = 'inputName',
  placeholder = 'placeholder',
  borderColor = '#e4e4e4',
}) => {
  const inputRef = useRef(null);
  const primaryColor = '#4785ff';

  // ESC 키가 눌렸을 때 입력 필드 포커스 해제
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      inputRef.current.blur();
    }
  };
  return (
    <div>
      <div
        style={{
          borderBottom: '1px solid #e4e4e4',
        }}
        className="flex h-48px w-full justify-between "
      >
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          className="mr-2.5 w-full pl-2.5 pr-2.5 text-14px"
          type={type}
          name={name}
          placeholder={placeholder}
        />
        <DoubleCheck isShow={true} />
        <DeleteContent isShow={true} />
        <EyeToggle isShow={true} />
      </div>
      <AlertText alertCase="invalidEmail" />
    </div>
  );
};
