import { ButtonVariable } from '@/components/common/molecule/ButtonVariable';
import { InputForm } from './molecule/InputForm';

const SignIn = () => {
  const handleSignIn = () => {
    alert('로그인 버튼 클릭 테스트');
  };

  return (
    <>
      <h2>SignIn</h2>
      <div className="mx-0 my-auto flex h-screen flex-col items-center">
        <form className="w-375px px-20px pt-16px" onSubmit={handleSignIn}>
          <div className="flex flex-col gap-20px">
            <InputForm
              type="email"
              name="useremail"
              placeholder="이메일 주소"
            />
            <InputForm
              type="password"
              name="userpassword"
              placeholder="비밀번호(영어, 숫자, 특수문자 조합)"
              delete={false}
            />
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
