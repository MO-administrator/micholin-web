/**
 * Sorts collection array by pubDate
 * @param a {{data: {pubDate: Date}}}
 * @param b {{data: {pubDate: Date}}}
 * @returns {number}
 */
export const sortByPubDate = (
  a: { data: { pubDate: Date } },
  b: { data: { pubDate: Date } }
): number => {
  return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
};
