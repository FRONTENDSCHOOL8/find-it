import { pb } from '@/lib/api/getPbData';
// import PocketBase from 'pocketbase';

// const pb = new PocketBase('https://findit.pockethost.io');
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { updateData, getData } from '@/lib/utils/crud';
import {
  GetSidoList,
  GetGunguList,
  GetCode,
} from '@/components/SignIn/molecule/GetLocalList';
import profile from '@/assets/profile.svg';
import profileIcon from '@/assets/icons/icon_camera.svg';
import Header from '@/components/Header/Header';
import getPbImgURL from '@/lib/utils/getPbImgURL';
import Horizon from '@/components/common/atom/Horizon';
import InputFormSlim from '@/components/SignIn/molecule/InputFormSlim';
import ButtonSelectItem from '@/components/common/molecule/ButtonSelectItem';
import SelectCategoryList from '@/components/common/molecule/SelectCategoryList';
import ModalComp from '@/components/common/molecule/ModalComp';

// 타입 정의
type AlertProps =
  | 'doubleCheckNickname'
  | 'doubleCheckPassword'
  | 'invalidValue'
  | 'invalidPassword'
  | '';
type ConfirmProps = 'doubleCheckEmail' | 'doubleCheckNickname' | '';

const MypageEdit = () => {
  /* -------------------------------------------------------------------------- */
  // 유효성 검사
  const regex = {
    pwRegex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
  };
  /* -------------------------------------------------------------------------- */
  //로컬 데이터 가져오기
  const loginUserData = localStorage.getItem('pocketbase_auth');
  const localData = loginUserData && JSON.parse(loginUserData);
  const userNickname = localData?.model?.nickname;
  const userId = localData?.model?.id;
  const userAvatar = localData?.model?.avatar;
  const userSido = localData?.model?.state;
  const userGungu = localData?.model?.city;

  /* -------------------------------------------------------------------------- */
  // 입력값

  const [passwordValue, setPasswordValue] = useState('');
  const [passwordDefaultValue, setPasswordDefaultValue] = useState('');
  const [valiPasswordForm, setValiPasswordForm] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [passwordDefaultType, setPasswordDefaultType] = useState('password');
  const [passwordCheckValue, setPasswordCheckValue] = useState('');
  const [passwordCheckType, setPasswordCheckType] = useState('password');
  const [alertPassword, setAlertPassword] = useState<AlertProps>();
  const [alertPasswordCheck, setAlertPasswordCheck] = useState<AlertProps>();

  const [nicknameValue, setNicknameValue] = useState('');
  const [valiNickDouble, setValiNickDouble] = useState(false);
  const [alertNickname, setAlertNickname] = useState<AlertProps>();
  const [confirmNickname, setConfirmNickname] = useState<ConfirmProps>();

  const nicknameRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordDefaultRef = useRef(null);
  const passwordCheckRef = useRef(null);

  // 비밀번호1 입력 & 정규식 검사
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPasswordValue(newValue);
    if (!newValue.match(regex.pwRegex)) {
      setAlertPassword('invalidPassword');
      setValiPasswordForm(false);
    } else {
      setAlertPassword('');
      setValiPasswordForm(true);
    }
  };
  // 비밀번호 기존 입력
  const handlePasswordDefault = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPasswordDefaultValue(newValue);
  };
  // 비밀번호2 입력 & 동일 검사
  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setPasswordCheckValue(newValue);
    if (newValue !== passwordValue) {
      setAlertPasswordCheck('doubleCheckPassword');
    } else {
      setAlertPasswordCheck('');
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
  // 비번 보이기 눈 버튼 : 인풋 타입을 텍스트로 바꿈
  const handleEyePassword = () => {
    setPasswordType((passwordType === 'password' && 'text') || 'password');
  };
  const handleEyePasswordDefault = () => {
    setPasswordDefaultType(
      (passwordDefaultType === 'password' && 'text') || 'password'
    );
  };
  const handleEyePasswordCheck = () => {
    setPasswordCheckType(
      (passwordCheckType === 'password' && 'text') || 'password'
    );
  };
  // 삭제 버튼
  const handleDeleteNickname = () => {
    setNicknameValue('');
    setAlertNickname('');
    setConfirmNickname('');
    setValiNickDouble(false);
    setSubmit(false);
  };

  const handleDeletePassword = () => {
    setPasswordValue('');
    setAlertPassword('');
    setSubmit(false);
  };
  const handleDeletePasswordDefault = () => {
    setPasswordDefaultValue('');
    setSubmit(false);
  };
  const handleDeletePasswordCheck = () => {
    setPasswordCheckValue('');
    setAlertPasswordCheck('');
    setSubmit(false);
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
  // // 첫번째 아이템 리스트
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
    nickname: `${nicknameValue}` || `${userNickname}`,
    oldPassword: `${passwordDefaultValue}`,
    password: `${passwordValue}`,
    passwordConfirm: `${passwordCheckValue}`,
    state: `${selectFirstItem}` || `${userSido}`,
    city: `${selectSecondItem}` || `${userGungu}`,
  };
  // 완료 조건
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (
      valiNickDouble ||
      (selectFirstItem && selectSecondItem) ||
      (passwordDefaultValue !== '' &&
        passwordValue === passwordCheckValue &&
        valiPasswordForm === true)
    ) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [
    valiNickDouble,
    selectFirstItem,
    selectSecondItem,
    valiPasswordForm,
    passwordDefaultValue,
    passwordValue,
    passwordCheckValue,
  ]);
  //완료 버튼 & 서버 보내고 모달창 뜨우기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [PWModalOpen, setPWModalOpen] = useState(false);

  const buttonSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateData('users', userId, updateUserData);
      setIsModalOpen(true);
    } catch (error) {
      setPWModalOpen(true);
      console.error('프로필 수정 페이지 통신 오류:', error);
    }
  };
  const onClickConfirm = () => {
    setPWModalOpen(false);
    window.location.href = '/mypage ';

    if (isModalOpen === true) {
      window.location.reload();
      setIsModalOpen(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  // 프로필 사진 변경
  // 파일 선택
  const avatarRef = useRef<HTMLImageElement>(null);

  const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);
  const formData = new FormData();
  useEffect(() => {
    const input = document.getElementById('fileInput') as HTMLInputElement;
    setFileInput(input);
  }, []);

  // 포켓베이스 파일 업로드 부분
  const handleFileInput = async () => {
    try {
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        console.log('업로드한 이미지:', file);
        formData.append('avatar', file);
      }
      console.log('폼데이터에 심은 업로드한 이미지:', formData.get('avatar'));

      // pb 업로드
      const updatedUserInfo = await pb
        .collection('users')
        .update(userId, formData);

      // 업로드한거 화면 반영
      const avatarUrl = (avatarRef.current.src = pb.files.getUrl(
        updatedUserInfo,
        updatedUserInfo.avatar,
        { thumb: '88x88' }
      ));
      avatarRef.current.src = avatarUrl;

      window.location.reload();
    } catch (error) {
      console.error('프로필 변경 데이터 통신 오류:', error);
      alert('서버가 불안정하여 재로그인이 필요합니다.');
    }
  };
  //프로필 버튼 클릭시 파일 선택창 열기
  const handleProfileChange = () => {
    if (fileInput) {
      fileInput.click();
    }
  };

  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  // 마크업
  return (
    <>
      <form
        className="mx-auto my-0 flex w-375px flex-col "
        onSubmit={buttonSubmit}
      >
        <Header
          isShowPrev={true}
          children={'프로필 수정'}
          isShowSubmit={!!submit}
        />
        <input
          id="fileInput"
          type="file"
          onChange={handleFileInput}
          className="hidden"
        />
        <button
          type="button"
          onClick={handleProfileChange}
          className="relative mx-auto mb-30px mt-20px"
        >
          <img
            ref={avatarRef}
            className="size-88px rounded-full"
            src={userAvatar !== '' ? getPbImgURL(userId, userAvatar) : profile}
            alt="나의 프로필 사진"
          />
          <img
            ref={avatarRef}
            className="absolute	bottom-0 right-0 z-10 size-32px translate-x-4px translate-y-4px "
            src={profileIcon}
            alt="프로필 사진 변경 버튼"
          ></img>
        </button>
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
          <li className=" py-26px">
            <Horizon lineBold="thin" lineWidth="short" />
          </li>
          <li className="flex items-baseline justify-between ">
            <h2 className="text-12px">기존 비밀번호</h2>
            <div className="w-232px">
              <InputFormSlim
                ref={passwordDefaultRef}
                type={passwordDefaultType}
                title="userpassword"
                placeholder="기존 비밀번호를 입력해주세요."
                value={passwordDefaultValue}
                onChange={handlePasswordDefault}
                iconDoubleCheck={false}
                iconDelete={!!passwordDefaultValue}
                iconEyeToggle={true}
                onClickDelete={handleDeletePasswordDefault}
                onClickEye={handleEyePasswordDefault}
              />
            </div>
          </li>
          <li className="mt-26px flex items-baseline justify-between ">
            <h2 className="text-12px">비밀번호 변경</h2>
            <div className="w-232px">
              <InputFormSlim
                ref={passwordRef}
                type={passwordType}
                title="userpassword"
                placeholder="변경할 비밀번호를 입력해주세요."
                value={passwordValue}
                onChange={handlePassword}
                iconDoubleCheck={false}
                iconDelete={!!passwordValue}
                iconEyeToggle={true}
                onClickDelete={handleDeletePassword}
                onClickEye={handleEyePassword}
                alertCase={alertPassword}
              />
            </div>
          </li>
          <li className="mt-16px flex items-baseline justify-between ">
            <h2 className="text-12px">비밀번호 확인</h2>
            <div className="w-232px">
              <InputFormSlim
                ref={passwordCheckRef}
                type={passwordCheckType}
                title="userpasswordCheck"
                placeholder="한번 더 입력해주세요."
                value={passwordCheckValue}
                onChange={handlePasswordCheck}
                iconDoubleCheck={false}
                iconDelete={!!passwordCheckValue}
                iconEyeToggle={true}
                onClickDelete={handleDeletePasswordCheck}
                onClickEye={handleEyePasswordCheck}
                alertCase={alertPasswordCheck}
              />
            </div>
          </li>
          <li className=" py-26px">
            <Horizon lineBold="thin" lineWidth="short" />
          </li>
          <li className="flex items-baseline justify-between ">
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
      </form>

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
      {isModalOpen && (
        <ModalComp
          children="프로필 수정이 완료되었습니다."
          confirmText="확인"
          onClickConfirm={onClickConfirm}
        />
      )}
      {PWModalOpen && (
        <ModalComp
          children="서버가 불안정하여 재로그인이 필요합니다."
          confirmText="확인"
          onClickConfirm={onClickConfirm}
        />
      )}
    </>
  );
};

export default MypageEdit;
