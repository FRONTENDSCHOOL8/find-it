import { useState } from 'react';
import Header from '@/components/Header/Header';

const Body = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value.replace(/^#/, ''));
  };
  return (
    <>
      <form className="flex w-315px flex-col pt-30px">
        <input
          type="text"
          placeholder="제목을 입력하세요."
          className="w-full text-24px  text-black"
          style={{ outline: 'none' }}
          maxLength={24}
        />
        <textarea
          placeholder="이야기하고 싶은 내용을 입력하세요."
          className="mt-16px h-300px w-full whitespace-normal text-20px  leading-30px text-gray-700"
          style={{ outline: 'none', resize: 'none' }}
          maxLength={150}
        />
      </form>
      <div className=" h-12px w-full border-t border-t-gray-300 bg-gray-200" />
      <div className="flex w-315px  pt-20px">
        <input
          type="text"
          placeholder="#해시태그를 입력하세요."
          className=" w-full text-16px text-black"
          value={inputValue && `#${inputValue}`}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

const CreatePost = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <Header isShowPrev={true} children="글쓰기" isShowSubmit={false} />
        <Body />
      </div>
    </>
  );
};

export default CreatePost;
