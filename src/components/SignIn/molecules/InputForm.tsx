import { ButtonIcon } from '@/components/SignIn/molecules/ButtonIcon';
import { AlertText } from '@/components/SignIn/atom/AlertText';
import { useRef } from 'react';

export const InputForm = ({
  type = 'text',
  name = 'inputName',
  placeholder = 'placeholder',
}) => {
  const inputRef = useRef(null);

  // ESC 키가 눌렸을 때 입력 필드 포커스 해제
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      inputRef.current.blur();
    }
  };
  /////////////////////////////
  return (
    <div>
      <div className="flex h-48px w-full justify-between border-b border-gray-300 ">
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          className="mr-2.5 w-full pl-2.5 pr-2.5 text-14px"
          type={type}
          name={name}
          placeholder={placeholder}
        />
        <ButtonIcon iconName="dubleCheck" />
        <ButtonIcon iconName="" />
        <ButtonIcon iconName="" />
      </div>
      <AlertText text="invalidEmail" />
    </div>
  );
};
