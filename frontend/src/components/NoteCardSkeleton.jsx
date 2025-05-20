const NoteCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow animate-pulse border-t-8 border-[#a3f7bf]">
      <div className="card-body space-y-4">
        <div className="h-4 bg-base-300 rounded w-2/3" />
        <div className="h-3 bg-base-300 rounded w-full" />
        <div className="h-3 bg-base-300 rounded w-5/6" />
        <div className="h-3 bg-base-300 rounded w-4/6" />
        <div className="flex justify-between items-center mt-4">
          <div className="h-3 w-24 bg-base-300 rounded" />
          <div className="flex gap-2">
            <div className="h-4 w-4 bg-base-300 rounded" />
            <div className="h-4 w-4 bg-base-300 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCardSkeleton;