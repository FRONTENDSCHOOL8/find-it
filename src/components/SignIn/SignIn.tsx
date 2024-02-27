import { ButtonIcon } from '@/components/SignIn/molecules/ButtonIcon';
import { ButtonVariable } from '@/components/SignIn/molecules/ButtonVariable';

const SignIn = () => {
  const handleSignIn = () => {
    alert('로그인유효성검사');
  };
  const handleSignUp = () => {
    alert('회원가입창');
  };
  const buttonTest = () => {
    alert('토글버튼 테스트');
  };

  return (
    <>
      <h2>SignIn</h2>
      <div className="mx-0 my-auto flex h-screen flex-col items-center">
        <form className="w-375px px-20px pt-16px" onSubmit={handleSignIn}>
          <div className="mb-14px flex h-48px w-full justify-between border-b border-gray-300">
            <input
              className="mr-2.5 w-full pl-2.5 text-xs"
              type="email"
              name="userName"
              placeholder="이메일 주소"
            />
            <ButtonIcon iconName="delete" />
          </div>
          <div className="flex h-48px w-full justify-between border-b border-gray-300 ">
            <input
              className="mr-2.5 w-full pl-2.5 text-xs"
              type="password"
              name="userPassword"
              placeholder="비밀번호(영어, 숫자, 특수문자 조합)"
            />
            <ButtonIcon iconName="eyeoff" />
          </div>
          <div className="box-border flex flex-col items-center gap-[1rem]	pt-60px">
            <ButtonVariable
              buttonType="submit"
              buttonText="로그인"
              variant="normal"
            />
            <ButtonVariable
              buttonType="button"
              buttonText="회원가입"
              variant="lineStyle"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
