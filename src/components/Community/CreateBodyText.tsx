import { useState } from 'react';

const CreateBodyText = ({
  titleValue,
  onChangeTitle,
  tagValue,
  onChangeTag,
  bodyValue,
  onChangeBody,
}) => {
  const [height, setHeight] = useState('200px');
  const handleTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChangeTitle(e.target.value);
  };

  const handleBodyValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    onChangeBody(e.target.value);
    const workingHeight = `${e.target.scrollHeight}px`;
    if (workingHeight >= '200px') {
      setHeight(workingHeight);
    }
  };
  const handleTagValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeTag(e.target.value);
  };

  return (
    <>
      <form className="flex w-315px flex-col pt-10px">
        <input
          type="text"
          placeholder="제목을 입력하세요."
          className="mt-10px w-full text-24px tracking-tight text-black"
          style={{ outline: 'none' }}
          maxLength={24}
          value={titleValue}
          onChange={handleTitleValue}
        />
        <textarea
          placeholder="이야기하고 싶은 내용을 입력하세요."
          className="mb-24px mt-12px w-full whitespace-normal break-keep text-16px leading-28px tracking-tight text-gray-700"
          style={{ outline: 'none', resize: 'none', height: height }}
          maxLength={500}
          value={bodyValue}
          onChange={handleBodyValue}
        />
      </form>
      <div className="h-12px w-full border-t border-t-gray-300 bg-gray-200" />
      <input
        type="text"
        placeholder="#해시태그를 입력하세요."
        className="mb-40px mt-20px  flex w-315px text-16px tracking-tight text-black"
        style={{ outline: 'none' }}
        maxLength={15}
        value={tagValue}
        onChange={handleTagValue}
      />
    </>
  );
};

export default CreateBodyText;
