export default function SkeletonLoader({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse h-[120px] flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100"></div>
            <div className="space-y-2 flex-1">
              <div className="h-3 bg-gray-100 rounded w-2/3"></div>
              <div className="h-2 bg-gray-50 rounded w-1/3"></div>
            </div>
          </div>
          <div className="flex justify-between items-end mt-4">
            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            <div className="h-4 bg-gray-50 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}