// import { pb } from '@/lib/utils/pb';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { createData, getData } from '@/lib/utils/crud';
import {
  GetSidoList,
  GetGunguList,
  GetCode,
} from '@/components/SignIn/molecule/GetLocalList';
import profile from '@/assets/profile.svg';
import Header from '@/components/Header/Header';
import getPbImgURL from '@/lib/utils/getPbImgURL';
import Horizon from '@/components/common/atom/Horizon';
import InputFormSlim from '@/components/SignIn/molecule/InputFormSlim';
import ButtonSelectItem from '@/components/common/molecule/ButtonSelectItem';
import SelectCategoryList from '@/components/common/molecule/SelectCategoryList';

// 타입 정의
type AlertProps =
  | 'doubleCheckEmail'
  | 'doubleCheckNickname'
  | 'doubleCheckPassword'
  | 'invalidValue'
  | 'invalidEmail'
  | 'invalidPassword'
  | '';
type ConfirmProps = 'doubleCheckEmail' | 'doubleCheckNickname' | '';

const MypageEdit = () => {
  //머지 테스트
  /* -------------------------------------------------------------------------- */
  // 유효성 검사
  const regex = {
    emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  };
  /* -------------------------------------------------------------------------- */
  //로컬 데이터 가져오기
  const loginUserData = localStorage.getItem('pocketbase_auth');
  const localData = loginUserData && JSON.parse(loginUserData);
  const userNickname = localData?.model?.nickname;
  const userEmail = localData?.model?.email;
  const userId = localData?.model?.id;
  const userAvatar = localData?.model?.avatar;
  const userSido = localData?.model?.state;
  const userGungu = localData?.model?.city;

  /* -------------------------------------------------------------------------- */
  // 이메일 & 닉네임 입력값
  const [emailValue, setEmailValue] = useState('');
  const [valiEmailDouble, setValiEmailDouble] = useState(false);
  const [valiEmailForm, setValiEmailForm] = useState(false);
  const [alertEmail, setAlertEmail] = useState<AlertProps>();
  const [confirmEmail, setConfirmEmail] = useState<ConfirmProps>();

  const [nicknameValue, setNicknameValue] = useState('');
  const [valiNickDouble, setValiNickDouble] = useState(false);
  const [alertNickname, setAlertNickname] = useState<AlertProps>();
  const [confirmNickname, setConfirmNickname] = useState<ConfirmProps>();

  const emailRef = useRef(null);
  const nicknameRef = useRef(null);

  // 이메일 & 정규식 검사
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newValue = e.target.value;
    setEmailValue(newValue);
    setConfirmEmail('');

    if (!newValue.match(regex.emailRegex)) {
      setAlertEmail('invalidEmail');
      setValiEmailForm(false);
    } else {
      setAlertEmail('');
      setValiEmailForm(true);
    }
  };
  //닉네임 입력 & 중복검사 문구 지우기, 중복검사 상태 지우기
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setNicknameValue(newValue);
    setAlertNickname('');
    setConfirmNickname('');
    setValiNickDouble(false);
  };

  // 이메일 중복확인
  const handleDoubleCheckEmail = async () => {
    try {
      const records = await getData('users', {
        filter: `email="${emailValue}"`,
      });
      const realdata = records && records[0];
      const emailData = realdata && realdata.email;
      if (emailData === emailValue) {
        setAlertEmail('doubleCheckEmail');
        setValiEmailDouble(false);
      } else {
        setAlertEmail('');
        setConfirmEmail('doubleCheckEmail');
        setValiEmailDouble(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 닉네임 중복확인
  const handleDoubleCheckNickname = async () => {
    try {
      const records = await getData('users', {
        filter: `nickname="${nicknameValue}"`,
      });
      const realdata = records && records[0];
      const nicknameData = realdata && realdata.nickname;
      if (nicknameData === nicknameValue) {
        setAlertNickname('doubleCheckNickname');
        setValiNickDouble(false);
      } else {
        setAlertNickname('');
        setConfirmNickname('doubleCheckNickname');
        setValiNickDouble(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 이메일 & 닉네임 삭제 버튼
  const handleDeleteEmail = () => {
    setEmailValue('');
    setAlertEmail('');
    setConfirmEmail('');
    setValiEmailDouble(false);
  };
  const handleDeleteNickname = () => {
    setNicknameValue('');
    setAlertNickname('');
    setConfirmNickname('');
    setValiNickDouble(false);
  };

  /* -------------------------------------------------------------------------- */
  // 지역 선택 버튼

  // 대분류 버튼 클릭시 대분류 리스트 랜더링 & 소분류 비활성화 & 소분류 초기화
  const [renderFirstList, setRenderFirstList] = useState(false);
  const [disabledSecond, setDisabledSecond] = useState(true);
  const handleFirstItem = () => {
    setRenderFirstList(true);
    setSelectSecondItem('');
    setDisabledSecond(true);
  };
  // 소분류 버튼 클릭시 소분류 리스트 랜더링
  const [renderSecondList, setRenderSecondList] = useState(false);
  const handleSecondItem = () => {
    setRenderSecondList(true);
  };

  // 렌더된 리스트 (SelectCategoryList 컴포넌트) 에서 찍은거 가져오기
  // 첫번째 아이템 리스트
  const [selectFirstItem, setSelectFirstItem] = useState('');
  const handleSelectFirstItem = (item: string) => {
    setSelectFirstItem(item);
  };
  // 두번째 아이템 리스트
  const [selectSecondItem, setSelectSecondItem] = useState('');
  const handleSelectSecondItem = (item: string) => {
    setSelectSecondItem(item);
  };
  // 뿌릴 데이터 종류 전달
  const LOCAL_CODE = GetCode(selectFirstItem);
  const firstItemList = GetSidoList(); // 문자열로 된 배열 반환
  const secondItemList = GetGunguList(`${LOCAL_CODE}`);

  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  // 업데이트 데이터
  const updateUserData = {
    email: emailValue,
    emailVisibility: true,
    nickname: nicknameValue,
    state: selectFirstItem,
    city: selectSecondItem,
  };
  // 완료 조건
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (
      valiNickDouble &&
      valiEmailDouble &&
      selectFirstItem &&
      selectSecondItem
    ) {
      setSubmit(true);
    }
  }, [valiNickDouble, valiEmailDouble, selectFirstItem, selectSecondItem]);
  //완료 버튼
  const isComplete = () => {
    return false;
  };
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  // 마크업
  return (
    <>
      <div className="mx-auto my-0 flex w-375px flex-col ">
        <Header
          isShowPrev={true}
          children={'프로필 수정'}
          isShowSubmit={!!submit} // Fix: Convert submit to boolean
        />
        <img
          className="mx-auto my-30px size-88px rounded-full"
          src={userAvatar !== '' ? getPbImgURL(userId, userAvatar) : profile}
          alt="나의 프로필 사진"
        />
        <ul className="mx-30px">
          <li className="flex items-baseline justify-between ">
            <h2 className="text-12px">닉네임</h2>
            <div className="w-232px">
              <InputFormSlim
                ref={nicknameRef}
                type="text"
                title="nickname"
                placeholder={userNickname}
                value={nicknameValue}
                onChange={handleNickname}
                iconDoubleCheck={true}
                iconDelete={!!nicknameValue}
                onClickDoubleCheck={handleDoubleCheckNickname}
                onClickDelete={handleDeleteNickname}
                alertCase={alertNickname}
                confirmCase={confirmNickname}
                disabledDoubleCheck={!nicknameValue}
              />
            </div>
          </li>
          <li className="mt-16px flex items-baseline justify-between ">
            <h2 className="text-12px">이메일</h2>
            <div className="w-232px">
              <InputFormSlim
                ref={emailRef}
                type="email"
                title="useremail"
                placeholder={userEmail}
                value={emailValue}
                onChange={handleEmail}
                iconDoubleCheck={true}
                iconDelete={!!emailValue}
                onClickDoubleCheck={handleDoubleCheckEmail}
                onClickDelete={handleDeleteEmail}
                alertCase={alertEmail}
                confirmCase={confirmEmail}
                disabledDoubleCheck={!valiEmailForm}
              />
            </div>
          </li>
          <li className="mt-24px flex items-baseline justify-between ">
            <h2 className="text-12px">거주지역</h2>
            <ButtonSelectItem
              firstName={selectFirstItem || userSido}
              secondName={selectSecondItem || userGungu}
              onClickFirst={handleFirstItem}
              onClickSecond={handleSecondItem}
              disabledSecond={disabledSecond}
            />
          </li>
          <li className=" py-26px">
            <Horizon lineBold="thin" lineWidth="short" />
          </li>
          <li>
            <Link
              to="/mypagedelete"
              className="flex items-center py-1 text-12px text-gray-500"
            >
              회원탈퇴
            </Link>
          </li>
        </ul>
      </div>
      <button onClick={isComplete}>확인</button>

      {renderFirstList && (
        <SelectCategoryList
          title={'거주하시는 시/도를 선택하세요.'}
          dataList={firstItemList}
          getSelectItem={handleSelectFirstItem} // 선택 아이템 가져옴
          onClose={() => setRenderFirstList(false)} // 바깥 영역 누르면 사라짐
        />
      )}
      {renderSecondList && (
        <SelectCategoryList
          title={'거주하시는 군/구를 선택하세요.'}
          dataList={secondItemList}
          getSelectItem={handleSelectSecondItem}
          onClose={() => setRenderSecondList(false)}
        />
      )}
    </>
  );
};

export default MypageEdit;
