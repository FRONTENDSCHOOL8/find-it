<<<<<<< HEAD:src/components/common/atom/AlertText.tsx
const AlertText = ({ alertCase }) => {
=======
export const AlertText = ({ text }) => {
>>>>>>> 616c48d747633d28c0ee1686a8ced60d3205d817:src/components/SignIn/atom/AlertText.tsx
  let comment = {
    doubleCheckEmail: '이미 사용중인 이메일 주소입니다.',
    doubleCheckNickname: '이미 사용중인 닉네임 입니다.',
    doubleCheckPassword: '비밀번호가 동일하지 않습니다.',
    invalidValue: '이메일 또는 비밀번호를 다시 확인해주세요.',
    invalidEmail: '이메일 형식에 맞게 입력해주세요.',
    invalidPassword:
      '비밀번호는 영어, 숫자, 특수문자를 포함한 10자 이상으로 설정해주세요.',
  };
  if (!text || !comment[text]) {
    return null;
  }

  const alertMessage = comment[text];
  return (
    <span className="inline-block w-full pl-10px pt-8px text-left text-12px text-secondary">
      {alertMessage}
    </span>
  );
};

export default AlertText;
