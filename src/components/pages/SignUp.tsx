import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';
import InputForm from '@/components/SignIn/molecule/InputForm';
import GetLocalList from '@/components/SignIn/molecule/GetLocalList';
import ButtonVariable from '@/components/common/molecule/ButtonVariable';
import ButtonSelectItem from '@/components/common/molecule/ButtonSelectItem';
import SelectCategoryList from '@/components/common/molecule/SelectCategoryList';

const SignIn = () => {
  const localListData = GetLocalList();
  const handleSignIn = () => {
    alert('로그인 버튼 클릭 테스트');
  };

  return (
    <>
      <div className="flex flex-col items-center ">
        <Header isShowPrev={true} children="회원가입" />
        <div className="flex flex-col items-center">
          <form className="w-375px px-20px pt-30px" onSubmit={handleSignIn}>
            <InputForm
              className="mb-20px"
              type="email"
              title="useremail"
              placeholder="이메일 주소를 입력해주세요."
            />
            <InputForm
              type="password"
              title="userpassword"
              placeholder="비밀번호를 입력해주세요."
              marginTop="20px"
            />
            <InputForm
              type="password"
              title="userpasswordCheck"
              placeholder="비밀번호를 다시 한번 입력해주세요."
              marginTop="8px"
            />
            <InputForm
              type="text"
              title="nickname"
              placeholder="닉네임을 입력해주세요."
              marginTop="20px"
            />
            <div className="mt-10px flex h-48px w-full items-center justify-between ">
              <input
                className="text-#989898 w-full pl-2.5 pr-2.5 text-14px"
                type="text"
                name="거주지역"
                disabled
                placeholder="거주지역을 선택해주세요"
              />
              <ButtonSelectItem firstName="시/도" secondName="군/구" />
            </div>
            <div className="box-border flex flex-col items-center gap-[1rem]	pt-60px">
              <ButtonVariable
                buttonType="submit"
                buttonText="완료"
                variant="disabled"
              />
            </div>
          </form>
        </div>
        <div className="absolute bottom-0 ">
          <Navigation />
        </div>
      </div>
    </>
  );
};

export default SignIn;
