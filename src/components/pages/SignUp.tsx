import { useEffect, useRef, useState } from 'react';
import { createData, getData } from '@/lib/utils/crud';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';
import InputForm from '@/components/SignIn/molecule/InputForm';
import GetLocalList from '@/components/SignIn/molecule/GetLocalList';
import ButtonVariable from '@/components/common/molecule/ButtonVariable';
import ButtonSelectItem from '@/components/common/molecule/ButtonSelectItem';
import SelectCategoryList from '@/components/common/molecule/SelectCategoryList';
// 1. 이메일 onchange 정규식 맞는지 확인 (로그인동일))   + 모두 입력시 활성화   ++ 아이디 비밀번호 db와 일치하는지 확인
// - 기본 툴팁 뜨는거 없애기
// 2. 비밀번호 인풋값 === 정규식 맞는지 확인
// - 위 비번 === 아래 비번 인풋 값과 맞는지 확인
// 3. 중복 눌럿을 시 인풋===/ db -> true
// - 중복 눌럿을 시  닉네임 인풋 ==/db -> true
// - x 누르면 인풋 삭제
// - 눈 누르면 비번 보이기
//4. 모두 입력시 true 면 버튼 활성화  :::: disable -> cofirn
// 지역 버튼 누르면 트루,

const SignUp = () => {
  /* -------------------------------------------------------------------------- */
  // 지역 리스트 데이터 가져오기
  const localData = GetLocalList();
  /* -------------------------------------------------------------------------- */
  // 유효성 검사용 정규식 : 비번 10자이상 영문 숫자 특수문자 포함
  const regex = {
    emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    pwRegex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{10,}$/,
  };

  /* -------------------------------------------------------------------------- */
  const [isSelectingCategory, setIsSelectingCategory] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordCheckValue, setPasswordCheckValue] = useState('');
  const [nicknameValue, setNicknameValue] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [passwordCheckType, setPasswordCheckType] = useState('password');
  const [alertEmail, setAlertEmail] = useState('');
  const [alertPassword, setAlertPassword] = useState('');
  const [alertNickname, setAlertNickname] = useState('');

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordCheckRef = useRef(null);
  const nicknameRef = useRef(null);

  // 지역 리스트 랜더링
  const handleCategorySelection = () => {
    setIsSelectingCategory(true);
  };
  /* -------------------------------------------------------------------------- */
  // 인풋값 읽어오기
  // 이메일 여기서 정규식 검사
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newValue = e.target.value;
    if (newValue.match(regex.emailRegex)) {
      setEmailValue(newValue);
      setAlertEmail('');
    } else {
      setAlertEmail('invalidEmail');
      setEmailValue(newValue);
    }
  };
  // 비밀번호 정규식 검사
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPasswordValue(newValue);
    if (!newValue.match(regex.pwRegex)) {
      setAlertPassword('invalidPassword');
    }
  };
  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPasswordCheckValue(newValue);
  };
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNicknameValue(newValue);
  };

  /* -------------------------------------------------------------------------- */
  // 더블 체크 함수 onClickDoubleCheck : db와 비교
  const handleDoubleCheckEmail = () => {
    //alertNickname doubleCheckEmail 지정

    alert('중복확인');
  };
  const handleDoubleCheckNickname = () => {
    //alertNickname doubleCheckNickname 지정
    alert('중복확인');
  };
  // 인풋값 삭제 함수 onClickDelete : 빈문자로 셋업
  const handleDeleteEmail = () => {
    setEmailValue('');
  };
  const handleDeletePassword = () => {
    setPasswordValue('');
  };
  const handleDeletePasswordCheck = () => {
    setPasswordCheckValue('');
  };
  const handleDeleteNickname = () => {
    setNicknameValue('');
  };
  // 비번 보이기 함수 onClickEye : 타입을 텍스트로 바꿈
  const handleEyePassword = () => {
    setPasswordType((passwordType === 'password' && 'text') || 'password');
  };
  const handleEyePasswordCheck = () => {
    setPasswordCheckType(
      (passwordCheckType === 'password' && 'text') || 'password'
    );
  };

  /* -------------------------------------------------------------------------- */
  // 신규 유저 데이터
  const newUserData = {
    email: emailValue,
    emailVisibility: true,
    password: passwordValue,
    passwordConfirm: passwordCheckValue,
    nickname: nicknameValue,
    state: 'test',
    city: 'test',
  };

  // 최종 버튼 활성화 & 데이터 보내기 : 버튼 베리언트를 변경
  const [variant, setVariant] = useState<'submit' | 'disabled'>('submit');
  // if (
  //   //조건
  // ) {
  //   setVariant('submit');
  // }
  // 유저 데이터 보내기
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (variant === 'submit') {
      const userData = await createData('users', newUserData);
      return userData;
    }
  };

  /* -------------------------------------------------------------------------- */
  // jsx 반환
  return (
    <>
      <div className="flex flex-col items-center ">
        <Header isShowPrev={true} children="회원가입" />
        <div className="flex flex-col items-center">
          <form className="w-375px px-20px pt-30px" onSubmit={createUser}>
            <InputForm
              ref={emailRef}
              type="email"
              title="useremail"
              placeholder="이메일 주소를 입력해주세요."
              value={emailValue}
              onChange={handleEmail}
              iconDoubleCheck={true}
              iconDelete={!!emailValue}
              onClickDoubleCheck={handleDoubleCheckEmail}
              onClickDelete={handleDeleteEmail}
              alertText={alertEmail || 'invalidEmail'}
            />
            <InputForm
              ref={passwordRef}
              marginTop="40px"
              type={passwordType}
              title="userpassword"
              placeholder="비밀번호를 입력해주세요."
              value={passwordValue}
              onChange={handlePassword}
              iconDelete={!!passwordValue}
              iconEyeToggle={true}
              onClickDelete={handleDeletePassword}
              onClickEye={handleEyePassword}
              // alertText="invalidPassword"
            />
            <InputForm
              marginTop="8px"
              ref={passwordCheckRef}
              type={passwordCheckType}
              title="userpasswordCheck"
              placeholder="비밀번호를 다시 한번 입력해주세요."
              value={passwordCheckValue}
              onChange={handlePasswordCheck}
              iconDelete={!!passwordCheckValue}
              iconEyeToggle={true}
              onClickDelete={handleDeletePasswordCheck}
              onClickEye={handleEyePasswordCheck}
            />
            <InputForm
              marginTop="40px"
              ref={nicknameRef}
              type="text"
              title="nickname"
              placeholder="닉네임을 입력해주세요."
              value={nicknameValue}
              onChange={handleNickname}
              iconDoubleCheck={true}
              iconDelete={!!nicknameValue}
              onClickDoubleCheck={handleDoubleCheckNickname}
              onClickDelete={handleDeleteNickname}
              // alertText="doubleCheckNickname"
            />
            <div className="mt-10px flex h-48px w-full items-center justify-between ">
              <input
                style={{ pointerEvents: 'none', cursor: 'default' }}
                className="text-#989898 w-full pl-2.5 pr-2.5 text-14px"
                type="text"
                name="거주지역"
                readOnly
                placeholder="거주지역을 선택해주세요"
              />
              <ButtonSelectItem
                firstName="시/도"
                secondName="군/구"
                onClickFirst={handleCategorySelection}
                onClickSecond={handleCategorySelection}
              />
            </div>
            <div className="box-border flex flex-col items-center gap-[1rem]	pt-60px">
              <ButtonVariable buttonText="완료" variant={variant} />
            </div>
          </form>
          {isSelectingCategory && (
            <SelectCategoryList
              title={'거주지를 선택하세요.'}
              dataList={localData}
            />
          )}
        </div>
        <div className="absolute bottom-0 ">
          <Navigation />
        </div>
      </div>
    </>
  );
};

export default SignUp;
