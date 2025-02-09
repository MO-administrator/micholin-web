/**
 * Generates a 6-digit verification code.
 * @returns {string} 6-digit verification code
 */
export const generateVerificationToken = async (): Promise<string> => {
  let code = Math.floor(Math.random() * 1e6).toString();
  while (code.length < 6) {
    code = await generateVerificationToken();
  }
  return code.toString();
};
