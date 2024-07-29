import SHA256 from "crypto-js/sha256";
/**
 * Returns a gravatar url string from email source
 * @param {string|null|undefined} email Source email string
 * @param {number|undefined} size Size of image
 * @param {string|undefined} defaultTheme Default image to use on gravatar
 * @returns {string} gravatar url string
 * @see [Gravatar](https://docs.gravatar.com/api/avatars/images/)
 */
export const getGravatarUrl = (
  email: string | null | undefined = "",
  size: number | undefined = 256,
  defaultTheme: string | undefined = "robohash"
): string => {
  const trimmedEmail = email?.trim().toLowerCase();
  const hash = trimmedEmail && SHA256(trimmedEmail);
  return `https://gravatar.com/avatar/${hash}?size=${size}&d=${defaultTheme}`;
};
