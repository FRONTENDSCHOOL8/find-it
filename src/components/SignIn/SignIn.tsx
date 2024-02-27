import { ButtonIcon } from '@/components/SignIn/molecules/ButtonIcon';

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
      <div className="mx-0 my-auto flex h-screen flex-col items-center bg-zinc-500">
        <form
          className="w-375px bg-black px-20px pt-16px"
          onSubmit={handleSignIn}
        >
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
          <div className="flex flex-col gap-[1rem]	pt-60px">
            <button
              className="h-66px w-full rounded-[20px] bg-primary text-white"
              type="submit"
            >
              로그인
            </button>
            <button
              className="h-66px w-full rounded-[20px] border	border-primary bg-white text-primary"
              type="button"
              onClick={handleSignUp}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
