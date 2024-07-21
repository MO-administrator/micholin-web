import argon from "argon2";

export const saltHashPassword = async (text: string) => {
  const hash = await argon.hash(text);
  return hash;
};
