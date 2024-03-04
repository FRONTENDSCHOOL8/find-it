import ButtonVariable from '../common/molecule/ButtonVariable';

export const Welcome = () => {
  return (
    <div>
      <h1>환영합니다!</h1>
      {/* <img src="@/"/> */}
      <ButtonVariable buttonText="내 분실물 찾으러가기" variant="submit" />
    </div>
  );
};
