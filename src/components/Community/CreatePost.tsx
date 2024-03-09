import { useEffect, useState } from 'react';
import { createData } from '@/lib/utils/crud';
import Header from '@/components/Header/Header';
import BodyText from '@/components/Community/BodyText';

/* -------------------------------------------------------------------------- */
//로컬 데이터 가져오기
const loginUserData = localStorage.getItem('pocketbase_auth');
const localData = loginUserData && JSON.parse(loginUserData);
const userNickname = localData?.model?.nickname;

// 1. 유저 닉네임 전달
// 2 제목, 시간, 내용 ,해시태그 전달

/* -------------------------------------------------------------------------- */
const CreatePost = () => {
  const [submit, setSubmit] = useState(false);
  const [titleValue, setTitleValue] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');

  // 값 입력
  const receiveTitleValue = (value) => {
    setTitleValue(value);
  };
  const receiveTagValue = (value) => {
    setTagValue(value);
  };
  const receiveBodyValue = (value) => {
    setBodyValue(value);
  };

  // 글 데이터
  const newPostData = {
    nickname: userNickname,
    title: titleValue,
    content: bodyValue,
    tag: tagValue,
  };

  // 완료 조건
  useEffect(() => {
    if (titleValue !== '') {
      setSubmit(true);
    }
  }, [titleValue]);

  //완료 버튼
  const buttonSubmit = async () => {
    await createData('community', newPostData);
    window.location.href = '/postlist';
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <Header
          isShowPrev={true}
          children="글쓰기"
          isShowSubmit={!!submit} // Fix: Convert submit to boolean
        />
        <BodyText
          titleValue={titleValue}
          onChangeTitle={receiveTitleValue}
          tagValue={tagValue}
          onChangeTag={receiveTagValue}
          bodyValue={bodyValue}
          onChangeBody={receiveBodyValue}
        />
        <button onClick={buttonSubmit}>완료</button>
      </div>
    </>
  );
};

export default CreatePost;
