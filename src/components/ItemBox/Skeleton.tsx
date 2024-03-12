const Skeleton: React.FC = () => {
  return (
    <div className="mb-12px flex h-140px w-335px items-center justify-between rounded-20px bg-white pl-20px pr-10px shadow">
      <div className="flex-grow space-y-3">
        <div className="h-26px w-128px animate-pulse rounded bg-slate-200"></div>
        <div className="h-21px w-61px animate-pulse rounded-full bg-slate-200"></div>
        <div className="h-16px w-46px animate-pulse rounded bg-slate-200"></div>
        <div className="h-16px w-77px animate-pulse rounded bg-slate-200"></div>
      </div>
      <div
        className={`animate-shimmer h-120px w-120px animate-pulse rounded-14px bg-slate-200`}
      ></div>
    </div>
  );
};

export default Skeleton;
