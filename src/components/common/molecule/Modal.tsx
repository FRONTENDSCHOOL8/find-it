interface ModalProps {
  cancelText?: string;
  confirmText: string;
  children: string;
}

const Modal: React.FC<ModalProps> = ({
  cancelText,
  confirmText = '확인',
  children,
}) => {
  let cancelButton;
  const buttonTextStyle =
    'leading-21px text-center font-medium tracking-[-.48px]';

  if (cancelText !== undefined) {
    cancelButton = (
      <button className={`${buttonTextStyle} text-gray-700`}>
        {cancelText}
      </button>
    );
  }

  return (
    <div className="flex w-302px flex-col items-center justify-center gap-26px rounded-20px bg-white px-76px pb-26px pt-46px">
      <p className="w-280px text-center text-14px text-gray-400">{children}</p>
      <div className="flex h-21px w-150px items-center justify-center gap-90px">
        {cancelButton}
        <button className={`${buttonTextStyle} text-primary`}>
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
