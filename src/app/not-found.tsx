import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-8xl mb-4">😕</div>
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">পেজটি খুঁজে পাওয়া যায়নি</h1>
      <p className="text-xs md:text-sm text-gray-500 mb-6 max-w-md">
        আপনি যে পেজটি খুঁজছেন তা সম্ভবত মুছে ফেলা হয়েছে অথবা ইউআরএল (URL) ভুল আছে।
      </p>
      <Link 
        href="/" 
        className="bg-[#047857] hover:bg-[#065f46] text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-sm transition-colors"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}