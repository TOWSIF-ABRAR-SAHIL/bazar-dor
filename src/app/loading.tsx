export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <span className="loading loading-spinner loading-lg text-[#047857]"></span>
      <p className="mt-4 text-sm font-medium text-gray-500">লোড হচ্ছে...</p>
    </div>
  );
}