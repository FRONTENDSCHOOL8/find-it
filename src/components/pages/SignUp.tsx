import { useEffect, useRef, useState } from 'react';
import { createData, getData } from '@/lib/utils/crud';
import Header from '@/components/Header/Header';
import InputForm from '@/components/SignIn/molecule/InputForm';
import GetLocalList from '@/components/SignIn/molecule/GetLocalList';
import ButtonVariable from '@/components/common/molecule/ButtonVariable';
import ButtonSelectItem from '@/components/common/molecule/ButtonSelectItem';
import SelectCategoryList from '@/components/common/molecule/SelectCategoryList';
// [1] ,[2] ,[3]
type AlertProps =
  | 'doubleCheckEmail'
  | 'doubleCheckNickname'
  | 'doubleCheckPassword'
  | 'invalidValue'
  | 'invalidEmail'
  | 'invalidPassword'
  | 'userDelete'
  | '';

const SignUp = () => {
  /* -------------------------------------------------------------------------- */
  // 지역 리스트 데이터 가져오기
  const localData = GetLocalList();
  /* -------------------------------------------------------------------------- */
  // 유효성 검사용 정규식 : 비번 8자이상 20자 이하영문 숫자 특수문자 포함
  const regex = {
    emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    pwRegex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,20}$/,
  };

  /* -------------------------------------------------------------------------- */
  const [isSelectingCategory, setIsSelectingCategory] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordCheckValue, setPasswordCheckValue] = useState('');
  const [nicknameValue, setNicknameValue] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [passwordCheckType, setPasswordCheckType] = useState('password');

  const [alertEmail, setAlertEmail] = useState<AlertProps>();
  const [alertPassword, setAlertPassword] = useState<AlertProps>();
  const [alertPasswordCheck, setAlertPasswordCheck] = useState<AlertProps>();
  const [alertNickname, setAlertNickname] = useState<AlertProps>();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordCheckRef = useRef(null);
  const nicknameRef = useRef(null);

  // 지역 리스트 랜더링
  const handleCategorySelection = () => {
    setIsSelectingCategory(true);
  };

  /* -------------------------------------------------------------------------- */
  // 이메일 입력 & 정규식 검사
  const [valiEmailFrom, setValiEmailFrom] = useState(false);
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newValue = e.target.value;
    setEmailValue(newValue);

    if (!newValue.match(regex.emailRegex)) {
      setAlertEmail('invalidEmail');
    } else {
      setAlertEmail('');
      setValiEmailFrom(true);
    }
  };
  // 비밀번호 입력 & 정규식 검사
  const [valiPassword, setValiPassword] = useState(false);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPasswordValue(newValue);
    if (!newValue.match(regex.pwRegex)) {
      setAlertPassword('invalidPassword');
    } else {
      setAlertPassword('');
      setValiPassword(true);
    }
  };
  // 비밀번호 입력 & 동일 검사
  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPasswordCheckValue(newValue);
    if (newValue !== passwordValue) {
      setAlertPasswordCheck('doubleCheckPassword');
    } else {
      setAlertPasswordCheck('');
    }
  };
  // 닉네임 입력
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNicknameValue(newValue);
  };

  /* -------------------------------------------------------------------------- */

  // 이메일 중복 확인    ----------------------------------->> 이메일 폼 맞앗을때로 조건 추가
  const [valiEmail, setValiEmail] = useState(false);
  const handleDoubleCheckEmail = async () => {
    try {
      const records = await getData('users', {
        filter: `email="${emailValue}"`, //조건 충족 리스트 가져옴(객체 1개배열)
      });
      const realdata = records && records[0];
      const emailData = realdata && realdata.email; //db 데이터 불러옴
      if (emailData === emailValue) {
        setAlertEmail('doubleCheckEmail');
      } else {
        setAlertEmail('');
        alert('사용 가능한 이메일 입니다.'); /// ----------------------------------->> 모달 창으로 바꾸기 [1]
        setValiEmail(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 닉네임 중복확인   ----------------------------------->> 닉네임 폼 맞앗을때로 조건 추가[2]
  const [valiNick, setValiNick] = useState(false);
  const handleDoubleCheckNickname = async () => {
    try {
      const records = await getData('users', {
        filter: `nickname="${nicknameValue}"`, //조건 충족 리스트 가져옴(객체 1개배열)
      });
      const realdata = records && records[0];
      const nicknameData = realdata && realdata.nickname; //db 데이터 불러옴
      if (nicknameData === nicknameValue) {
        setAlertNickname('doubleCheckNickname');
      } else {
        setAlertNickname('');
        alert('사용 가능한 닉네임 입니다.'); /// ----------------------------------->> 모달 창으로 바꾸기
        setValiNick(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 비번 보이기 눈 버튼 : 인풋 타입을 텍스트로 바꿈
  const handleEyePassword = () => {
    setPasswordType((passwordType === 'password' && 'text') || 'password');
  };
  const handleEyePasswordCheck = () => {
    setPasswordCheckType(
      (passwordCheckType === 'password' && 'text') || 'password'
    );
  };
  /* -------------------------------------------------------------------------- */
  // 중복검사 활성화 조건
  // const [activeDoubleCheck, setActiveDoubleCheck] = useState(false);
  // useEffect(() => {
  //   if (emailValue === '' || valiEmail === false) {
  //     setActiveDoubleCheck(false);
  //   } else {
  //     setActiveDoubleCheck(true);
  //   }
  // }, [emailValue, valiEmail, nicknameValue]);
  /* -------------------------------------------------------------------------- */
  // 딜리트 버튼 실행 : 빈문자로 셋업
  const handleDeleteEmail = () => {
    setEmailValue('');
    setValiEmail(false);
    setAlertEmail('');
  };
  const handleDeletePassword = () => {
    setPasswordValue('');
    setAlertPassword('');
  };
  const handleDeletePasswordCheck = () => {
    setPasswordCheckValue('');
    setAlertPasswordCheck('');
  };
  const handleDeleteNickname = () => {
    setNicknameValue('');
    setValiNick(false);
    setAlertNickname('');
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
  /* -------------------------------------------------------------------------- */
  // 최종 버튼 활성화 & 데이터 보내기 : 버튼 베리언트를 변경
  const [variant, setVariant] = useState<'submit' | 'disabled'>('disabled');
  useEffect(() => {
    if (
      emailValue !== '' &&
      valiEmailFrom === true && //  --> 이건 나중에 없어도 됨 중복확인 버튼 토글될필요 없음 [3]
      valiEmail === true &&
      valiPassword === true &&
      passwordValue === passwordCheckValue &&
      nicknameValue !== '' &&
      valiNick === true
    ) {
      setVariant('submit');
    } else {
      setVariant('disabled');
    }
  }, [
    emailValue,
    valiEmailFrom,
    valiEmail,
    valiPassword,
    passwordValue,
    passwordCheckValue,
    nicknameValue,
    valiNick,
  ]);

  // 유저 데이터 보내기
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (variant === 'submit') {
      try {
        const userData = await createData('users', newUserData);
        //페이지 이동하는 함수
        window.location.href = '/welcome';
        return userData;
      } catch (error) {
        console.error('회원가입 유저 데이터 보내기 에러났슈:', error);
      }
    }
  };

  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  // jsx 반환
  return (
    <>
      <div className="flex flex-col items-center ">
        <Header isShowPrev={true} children="회원가입" empty={true} />
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
              alertCase={alertEmail}
              // disabledDoubleCheck={activeDoubleCheck}
            />
            <InputForm
              ref={passwordRef}
              marginTop="40px"
              type={passwordType}
              title="userpassword"
              placeholder="비밀번호를 입력해주세요."
              value={passwordValue}
              onChange={handlePassword}
              iconDoubleCheck={false}
              iconDelete={!!passwordValue}
              iconEyeToggle={true}
              onClickDelete={handleDeletePassword}
              onClickEye={handleEyePassword}
              alertCase={alertPassword}
            />
            <InputForm
              marginTop="8px"
              ref={passwordCheckRef}
              type={passwordCheckType}
              title="userpasswordCheck"
              placeholder="비밀번호를 다시 한번 입력해주세요."
              value={passwordCheckValue}
              onChange={handlePasswordCheck}
              iconDoubleCheck={false}
              iconDelete={!!passwordCheckValue}
              iconEyeToggle={true}
              onClickDelete={handleDeletePasswordCheck}
              onClickEye={handleEyePasswordCheck}
              alertCase={alertPasswordCheck}
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
              alertCase={alertNickname}
              // disabledDoubleCheck={activeDoubleCheck}
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
            <div className="box-border flex flex-col items-center gap-[1rem]	pt-80px">
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
      </div>
    </>
  );
};

export default SignUp;
