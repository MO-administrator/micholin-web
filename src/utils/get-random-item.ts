/**
 * Returns a random item from a list of items
 * @param {Array<any>} list list of items
 * @returns {any}
 */
export const getRandomItem = (list: any[]): any => {
  return list[Math.floor(Math.random() * list.length)];
};
