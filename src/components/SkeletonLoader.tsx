export default function SkeletonLoader({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 border border-gray-200/80 animate-pulse h-[140px] flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-3 bg-gray-100 rounded w-1/3"></div>
            </div>
          </div>
          <div className="flex justify-between items-end mt-4 pt-3 border-t border-gray-100">
            <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            <div className="h-5 bg-gray-100 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}