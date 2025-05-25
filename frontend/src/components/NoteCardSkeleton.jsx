const NoteCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-md animate-pulse border-t-8 border-primary rounded-md">
      <div className="card-body space-y-4">
        <div className="h-4 bg-base-200 rounded-md w-2/3 opacity-70" />
        <div className="h-3 bg-base-200 rounded-md w-full opacity-70" />
        <div className="h-3 bg-base-200 rounded-md w-5/6 opacity-70" />
        <div className="h-3 bg-base-200 rounded-md w-4/6 opacity-70" />
        <div className="flex justify-between items-center mt-4">
          <div className="h-3 w-24 bg-base-200 rounded-md opacity-70" />
          <div className="flex gap-3">
            <div className="h-4 w-4 bg-base-200 rounded-md opacity-70" />
            <div className="h-4 w-4 bg-base-200 rounded-md opacity-70" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteCardSkeleton