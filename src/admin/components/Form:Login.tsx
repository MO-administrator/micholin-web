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
        className="flex flex-col flex-auto justify-center gap-4"
      >
        <fieldset className="flex flex-col flex-auto justify-center gap-4">
          <legend className="flex flex-col mx-auto place-items-center">
            <div className="flex h-20 w-20 mx-auto place-items-center motion-safe:animate-spin-slow">
              <img
                src="/icons/react-icon.svg"
                alt="react-logo"
                loading="eager"
              />
            </div>
            <h1 className="text-center mb-4">Login Page</h1>
          </legend>
          <span className="flex flex-auto gap-2 justify-between place-items-center">
            <label htmlFor="username">Username:</label>
            <input
              className="text-slate-600 font-serif py-1 px-2 rounded-full"
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={handleChangeUsername}
              required
            />
          </span>
          <span className="flex flex-auto gap-2 justify-between place-items-center">
            <label htmlFor="password">Password:</label>
            <input
              className="text-slate-600 font-serif py-1 px-2 rounded-full"
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleChangePassword}
              required
            />
          </span>
          <input
            id='login-btn'
            className="flex justify-center place-items-center text-center w-full p-2 my-4 mx-auto cursor-pointer bg-slate-600 border-2 border-white rounded-full rounded-bl-3xl rounded-tr-3xl transform ease-in-out duration-300 hover:scale-110"
            type="submit"
            form="login"
            value="Log In &rarr;"
          />
        </fieldset>
      </form>
    </>
  );
};
