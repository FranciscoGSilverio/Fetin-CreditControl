type FormatedDate = {
  day: string;
  month: string;
  year: string;
  hours: string;
  minutes: string;
  seconds: string;
};

export const formatDate = (date: Date): FormatedDate => {
  const currentDate = new Date(date);

  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = String(currentDate.getFullYear());

  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  return { day, month, year, hours, minutes, seconds };
};
