const BodyText = ({
  titleValue,
  onChangeTitle,
  tagValue,
  onChangeTag,
  bodyValue,
  onChangeBody,
}) => {
  const handleTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChangeTitle(e.target.value);
  };
  const handleTagValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeTag(e.target.value.replace(/^#/, ''));
  };
  const handleBodyValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    onChangeBody(e.target.value);
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
          value={titleValue}
          onChange={handleTitleValue}
        />
        <textarea
          placeholder="이야기하고 싶은 내용을 입력하세요."
          className="mt-16px h-200px w-full whitespace-normal text-20px  leading-30px text-gray-700"
          style={{ outline: 'none', resize: 'none' }}
          maxLength={300}
          value={bodyValue}
          onChange={handleBodyValue}
        />
      </form>
      <div className=" h-12px w-full border-t border-t-gray-300 bg-gray-200" />
      <input
        type="text"
        placeholder="#해시태그를 입력하세요."
        className="mb-40px mt-20px  flex w-315px text-16px text-black"
        style={{ outline: 'none' }}
        maxLength={15}
        value={tagValue && `#${tagValue}`}
        onChange={handleTagValue}
      />
    </>
  );
};

export default BodyText;
