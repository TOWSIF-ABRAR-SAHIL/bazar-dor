// ইংরেজি থেকে বাংলা ডিজিটে কনভার্ট
export const toBanglaDigits = (num: number | string | undefined | null): string => {
  if (num === undefined || num === null) return '০';
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (x) => banglaDigits[Number(x)]);
};

// দাম ফরম্যাট করার ফাংশন
export const formatBanglaPrice = (price: number | undefined | null): string => {
  if (!price && price !== 0) return '০';
  const formatted = Number(price).toLocaleString('en-IN');
  return toBanglaDigits(formatted);
};

// বাংলা তারিখ প্রকাশের নিরাপদ ফাংশন
export const getBanglaDate = (dateObj: Date = new Date()): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return dateObj.toLocaleDateString('bn-BD', options);
};

// ইউনিট কনভার্সন
export const getBanglaUnit = (unit: string | undefined | null): string => {
  if (!unit) return 'প্রতি কেজি';
  const u = unit.toLowerCase();
  if (u === 'kg') return 'প্রতি কেজি';
  if (u === 'litre' || u === 'liter') return 'প্রতি লিটার';
  if (u === 'dozen') return 'প্রতি ডজন';
  if (u === 'piece') return 'প্রতি পিস';
  return `প্রতি ${unit}`;
};