import Modal from '@/components/common/molecule/Modal';

const ModalComp = ({ children, confirmText, onClickConfirm }) => {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-[#00000045]">
      <Modal
        children={children}
        confirmText={confirmText}
        onClickConfirm={onClickConfirm}
      />
    </div>
  );
};

export default ModalComp;
