import { useEffect, useRef, useState } from 'react';
import { pb } from '@/lib/api/getPbData';
import { getData } from '@/lib/utils/crud';
import Header from '@/components/Header/Header';
import InputForm from '@/components/SignIn/molecule/InputForm';
import ButtonVariable from '@/components/common/molecule/ButtonVariable';

/* -------------------------------------------------------------------------- */
//알럿창 타입 정의
type AlertProps =
  | 'doubleCheckEmail'
  | 'doubleCheckNickname'
  | 'doubleCheckPassword'
  | 'invalidValue'
  | 'invalidEmail'
  | 'invalidPassword'
  | 'userEmail'
  | 'userEmailDouble'
  | '';

const SignIn = () => {
  /* -------------------------------------------------------------------------- */
  // 변수
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordType, setPasswordType] = useState('password');

  const [alertEmail, setAlertEmail] = useState<AlertProps>();
  const [alertPassword, setAlertPassword] = useState<AlertProps>();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  /* -------------------------------------------------------------------------- */
  // 입력 함수
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newValue = e.target.value;
    setEmailValue(newValue);
    setAlertEmail('');
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPasswordValue(newValue);
    setAlertPassword('');
  };

  // 비번 눈 보이기
  const handleEyePassword = () => {
    setPasswordType((passwordType === 'password' && 'text') || 'password');
  };

  // 삭제 버튼
  const handleDeleteEmail = () => {
    setEmailValue('');
    setAlertEmail('');
  };
  const handleDeletePassword = () => {
    setPasswordValue('');
    setAlertPassword('');
  };
  /* -------------------------------------------------------------------------- */
  // 회원가입 버튼
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = '/signup';
  };

  // 로그인 버튼 활성화 조건 : 빈문자열만 아니면 됨
  const [variant, setVariant] = useState<'submit' | 'disabled'>('disabled');
  useEffect(() => {
    if (emailValue !== '' && passwordValue !== '') {
      setVariant('submit');
    } else {
      setVariant('disabled');
    }
  }, [emailValue, passwordValue]);

  // 최종 로그인 버튼
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      // 이메일 있는지 확인
      const records = await getData('users', {
        filter: `email="${emailValue}"`, //pb 에서 조건 충족 리스트 가져옴(객체 1개배열)
      });
      const realdata = records && records[0];
      const emailData = realdata && realdata.email;
      if (emailData === emailValue) {
        /// 이메일 같을 경우 권한 db 전송
        try {
          await pb
            .collection('users')
            .authWithPassword(emailValue, passwordValue);
          window.location.href = '/';
        } catch (error) {
          setAlertPassword('invalidValue');
        }
      } else {
        setAlertEmail('userEmail');
      }
    })();
  };
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  // 마크업
  return (
    <>
      <div className="flex flex-col items-center ">
        <Header children="로그인" empty={true} isShowPrev={true} />
        <div className="flex flex-col items-center">
          <form className="w-375px px-20px pt-30px" onSubmit={handleSignIn}>
            <div className="flex flex-col gap-20px">
              <InputForm
                ref={emailRef}
                type="email"
                title="useremail"
                placeholder="이메일"
                value={emailValue}
                onChange={handleEmail}
                iconDelete={!!emailValue}
                onClickDelete={handleDeleteEmail}
                alertCase={alertEmail}
              />
              <InputForm
                ref={passwordRef}
                type={passwordType}
                title="userpassword"
                placeholder="비밀번호(영어, 숫자, 특수문자 조합)"
                value={passwordValue}
                onChange={handlePassword}
                iconDelete={!!passwordValue}
                iconEyeToggle={true}
                onClickDelete={handleDeletePassword}
                onClickEye={handleEyePassword}
                alertCase={alertPassword}
              />
            </div>
            <div className="box-border flex flex-col items-center gap-[1rem]	pt-80px">
              <ButtonVariable buttonText="로그인" variant={variant} />
              <ButtonVariable
                buttonText="회원가입"
                variant="lineStyle"
                onClick={handleSignUp}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
