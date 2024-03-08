type AlertTextProps = {
  alertCase?:
    | 'doubleCheckEmail'
    | 'doubleCheckNickname'
    | 'doubleCheckPassword'
    | 'invalidValue'
    | 'invalidEmail'
    | 'invalidPassword'
    | 'userEmail'
    | 'userEmailDouble'
    | '';
};

const AlertText: React.FC<AlertTextProps> = ({ alertCase = '' }) => {
  const comment: { [key: string]: string } = {
    doubleCheckEmail: '이미 사용 중인 이메일 주소입니다.',
    doubleCheckNickname: '이미 사용 중인 닉네임 입니다.',
    doubleCheckPassword: '비밀번호가 일치하지 않습니다.',
    invalidValue: '이메일 또는 비밀번호를 다시 확인해주세요.',
    invalidEmail: '이메일 형식에 맞게 입력해주세요.',
    invalidPassword: `비밀번호는 영어, 숫자, 특수문자를 포함하여\n8자 이상으로 설정해주세요.`,
    userEmail: '이메일 주소를 확인해주세요.',
    userEmailDouble: '회원정보가 일치하지 않습니다.',
  };
  if (!alertCase || !comment[alertCase]) {
    return null;
  }

  const alertMessage = comment[alertCase];
  return (
    <span className="inline-block w-244px pl-10px pt-8px text-left text-12px text-secondary">
      {alertMessage}
    </span>
  );
};

export default AlertText;
