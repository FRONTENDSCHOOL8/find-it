interface timeProps {
  createdAt: string;
}

export const getTimeDiff: React.FC<timeProps> = ({ createdAt }) => {
  const milliSeconds = new Date().getTime() - new Date(createdAt).getTime();
  const seconds = milliSeconds / 1000;

  if (seconds < 60) {
    return <span className="text-10px text-gray-450">방금 전</span>;
  }

  const minutes = seconds / 60;
  if (minutes < 60) {
    return (
      <span className="text-10px text-gray-450">
        {Math.floor(minutes)}분 전
      </span>
    );
  }

  const hours = minutes / 60;
  if (hours < 24) {
    return (
      <span className="text-10px text-gray-450">
        {Math.floor(hours)}시간 전
      </span>
    );
  }

  const days = hours / 24;
  if (days < 7) {
    return (
      <span className="text-10px text-gray-450">{Math.floor(days)}일 전</span>
    );
  }

  const weeks = days / 7;
  if (weeks < 5) {
    return (
      <span className="text-10px text-gray-450">{Math.floor(weeks)}주 전</span>
    );
  }

  const months = days / 30;
  if (months < 12) {
    return (
      <span className="text-10px text-gray-450">
        {Math.floor(months)}개월 전
      </span>
    );
  }

  const years = days / 365;
  return (
    <span className="text-10px text-gray-450">{Math.floor(years)}년 전</span>
  );
};
