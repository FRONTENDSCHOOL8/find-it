import {
  DoubleCheck,
  DeleteContent,
  EyeToggle,
} from '@/components/SignIn/molecule/ButtonIcon';
import AlertText from '@/components/common/atom/AlertText';
import { useRef } from 'react';

export const InputForm = ({
  type = 'text',
  name = 'inputName',
  placeholder = 'placeholder',
  alretText = '',
}) => {
  const inputRef = useRef(null);

  // ESC 키가 눌렸을 때 입력 필드 포커스 해제
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      inputRef.current.blur();
    }
  };
  return (
    <div>
      <div className="flex h-48px w-full justify-between border-b border-gray-300 ">
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          className="w-full pl-2.5 pr-2.5 text-14px"
          type={type}
          name={name}
          placeholder={placeholder}
        />
        <div className="px- flex gap-10px">
          <DoubleCheck isShow={true} />
          <DeleteContent isShow={true} />
          <EyeToggle isShow={true} />
        </div>
      </div>
<<<<<<< HEAD
      <AlertText alertCase={alretText} />
=======
      <AlertText text={alretText} />
>>>>>>> 616c48d747633d28c0ee1686a8ced60d3205d817
    </div>
  );
};
