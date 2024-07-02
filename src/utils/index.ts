export const formatDate = (
  date: number | string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
) => new Date(date).toLocaleString(undefined, options);

export const getRandomItem = (list: any[]) =>
  list[Math.floor(Math.random() * list.length)];

export const scrollIntoView = (id: string) => {
  document.addEventListener("astro:page-load", () => {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
  });
};
