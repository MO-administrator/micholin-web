import { useState, type ChangeEvent } from "react";
import { useAuthContext } from "../contexts/AuthContext";

/**
 * React admin application login
 * @returns
 */
export const FormLogin = () => {
  const { handleLogin, btnRef } = useAuthContext();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  /** TODO
   * Add validation for username
   * Add validation for password
   */

  /**
   * Sets the local state username as the user types.
   * @param e username input change
   */
  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  /**
   * Sets the local state password as the user types.
   * @param e password input change
   */
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <>
      <form
        id="login"
        noValidate
        spellCheck
        onSubmit={handleLogin}
        className="grid justify-center gap-4"
      >
        <fieldset className="grid justify-center gap-4">
          <div className="grid place-self-center place-items-center">
            <div className="block w-20 h-20 motion-safe:animate-spin-slow">
              <img
                src="/icons/react-icon.svg"
                alt="react-logo"
                loading="eager"
              />
            </div>
            <h1 className="mb-4 text-center">Login Page</h1>
          </div>
          <span className="grid justify-between grid-flow-row gap-2 place-items-center">
            <label htmlFor="username">Username:</label>
            <input
              className="px-2 py-1 font-serif rounded-full text-slate-600"
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={handleChangeUsername}
              required
            />
          </span>
          <span className="grid justify-between grid-flow-row gap-2 place-items-center">
            <label htmlFor="password">Password:</label>
            <input
              className="px-2 py-1 font-serif rounded-full text-slate-600"
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleChangePassword}
              required
            />
          </span>
          <input
            ref={btnRef}
            className="flex justify-center w-full p-2 mx-auto my-4 text-center duration-300 ease-in-out transform border-2 border-white rounded-full cursor-pointer place-items-center bg-slate-600 rounded-bl-3xl rounded-tr-3xl hover:scale-110"
            type="submit"
            form="login"
            value="Log In &rarr;"
          />
        </fieldset>
      </form>
    </>
  );
};
