import { useState, type ChangeEvent } from "react";
import { useAuthContext } from "../contexts/AuthContext";

export const FormLogin = () => {
  const { handleLogin } = useAuthContext();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  /** TODO
   * Add validation for username
   * Add validation for password
   */

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
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
        className="flex flex-col justify-center flex-auto gap-4"
      >
        <fieldset className="flex flex-col justify-center flex-auto gap-4">
          <legend className="flex flex-col m-0 place-items-center">
            <div className="flex w-20 h-20 mx-auto place-items-center motion-safe:animate-spin-slow">
              <img
                src="/icons/react-icon.svg"
                alt="react-logo"
                loading="eager"
              />
            </div>
            <h1 className="mb-4 text-center">Login Page</h1>
          </legend>
          <span className="flex justify-between flex-auto gap-2 place-items-center">
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
          <span className="flex justify-between flex-auto gap-2 place-items-center">
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
            id="login-btn"
            className="flex justify-center w-full p-2 mx-auto my-4 text-center border-2 border-white rounded-full cursor-pointer place-items-center bg-slate-600 rounded-bl-3xl rounded-tr-3xl transform ease-in-out duration-300 hover:scale-110"
            type="submit"
            form="login"
            value="Log In &rarr;"
          />
        </fieldset>
      </form>
    </>
  );
};
