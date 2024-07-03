import { ReactNode } from 'react';
import { JSX } from 'react/jsx-runtime';

interface ModalProps {
  cancelText?: string;
  confirmText: string;
  children: string;
  onClickCancel?: () => void;
  onClickConfirm?: () => void;
}

type CancelButton =
  | string
  | number
  | boolean
  | JSX.Element
  | Iterable<ReactNode>;

const Modal: React.FC<ModalProps> = ({
  cancelText,
  confirmText = '확인',
  children,
  onClickCancel,
  onClickConfirm,
}) => {
  let cancelButton: CancelButton;

  const buttonTextStyle =
    'leading-21px text-center font-medium tracking-[-.48px]';

  if (cancelText !== undefined) {
    cancelButton = (
      <button
        type="button"
        onClick={onClickCancel}
        className={`${buttonTextStyle} text-gray-700`}
      >
        {cancelText}
      </button>
    );
  }

  return (
    <div className="flex w-302px flex-col items-center justify-center gap-26px rounded-20px bg-white px-76px pb-26px pt-46px">
      <p className="w-280px text-center text-14px text-gray-400">{children}</p>
      <div className="flex h-21px w-150px items-center justify-center gap-90px">
        {cancelButton}
        <button
          type="button"
          onClick={onClickConfirm}
          className={`${buttonTextStyle} text-primary`}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
