// ইংরেজি থেকে বাংলা ডিজিটে কনভার্ট
export const toBanglaDigits = (num: number | string | undefined | null): string => {
  if (num === undefined || num === null) return '০';
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (x) => banglaDigits[Number(x)]);
};

// দাম ফরম্যাট করার ফাংশন
export const formatBanglaPrice = (price: number): string => {
  const formatted = price.toLocaleString('en-IN');
  return toBanglaDigits(formatted);
};

// আজকের বাংলা তারিখ
export const getBanglaDate = (): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return now.toLocaleDateString('bn-BD', options);
};