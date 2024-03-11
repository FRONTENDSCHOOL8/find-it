import { useEffect, useState } from 'react';
import { createData } from '@/lib/utils/crud';
import Header from '@/components/Header/Header';
import CreateBodyText from '@/components/Community/CreateBodyText';
import Horizon from '@/components/common/atom/Horizon';

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
    if (titleValue !== '' && bodyValue !== '' && tagValue !== '') {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [titleValue, bodyValue, tagValue]);

  //완료 버튼
  const buttonSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createData('community', newPostData);
    window.location.href = '/postlist';
  };

  return (
    <>
      <form
        className="flex w-full flex-col items-center justify-center"
        onSubmit={buttonSubmit}
      >
        <Header isShowPrev={true} children="글쓰기" isShowSubmit={!!submit} />
        <Horizon lineBold="thin" lineWidth="long" />

        <CreateBodyText
          titleValue={titleValue}
          onChangeTitle={receiveTitleValue}
          tagValue={tagValue}
          onChangeTag={receiveTagValue}
          bodyValue={bodyValue}
          onChangeBody={receiveBodyValue}
        />
      </form>
    </>
  );
};

export default CreatePost;
