import { EyeOff, EyeOn } from '@/components/SignIn/icons/IconEye';
import IconDelete from '@/components/SignIn/icons/IconDelete';

const SignIn = () => {
  const handleSignIn = () => {
    alert('로그인유효성검사');
  };
  const handleSignUp = () => {
    alert('회원가입창');
  };

  return (
    <>
      <h2>SignIn</h2>
      <form className="" onSubmit={handleSignIn}>
        <div className="flex items-center border-b border-gray-300">
          <input
            className="h-48px w-30px pl-2.5 text-xs"
            type="email"
            name="userName"
            placeholder="이메일 주소"
          />
          <button className="absolute right-10px inline">
            <EyeOff />
          </button>
          <button className="absolute right-10px hidden" onClick={handleSignUp}>
            <EyeOn />
          </button>
        </div>
        <div className="flex items-center border-b border-gray-300">
          <input
            className="h-48px pl-2.5  text-xs"
            type="password"
            name="userPassword"
            placeholder="비밀번호(영어, 숫자, 특수문자 조합)"
          />
          <button className="absolute right-10px inline" onClick={handleSignUp}>
            <IconDelete color="#666" />
          </button>
        </div>
        <div className="flex flex-col	gap-[1rem]">
          <button
            className="w-334 h-66px rounded-[20px] bg-primary	 text-white"
            type="submit"
          >
            로그인
          </button>
          <button
            className="w-334 h-66px rounded-[20px] border	border-primary bg-white text-primary"
            type="button"
            onClick={handleSignUp}
          >
            회원가입
          </button>
        </div>
      </form>
    </>
  );
};

export default SignIn;
