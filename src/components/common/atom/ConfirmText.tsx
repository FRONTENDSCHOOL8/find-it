type ConfirmTextProps = {
  confirmCase?: 'doubleCheckEmail' | 'doubleCheckNickname' | '';
};

const ConfirmText: React.FC<ConfirmTextProps> = ({ confirmCase = '' }) => {
  const comment: { [key: string]: string } = {
    doubleCheckEmail: '사용 가능한 이메일 주소입니다.',
    doubleCheckNickname: '사용 가능한 닉네임 입니다.',
  };
  if (!confirmCase || !comment[confirmCase]) {
    return null;
  }

  const confirmMessage = comment[confirmCase];
  return (
    <span className="inline-block w-244px pl-10px pt-8px text-left text-12px text-primary">
      {confirmMessage}
    </span>
  );
};

export default ConfirmText;
