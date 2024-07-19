import { useAuthContext } from "../contexts/AuthContext";

export const Home = () => {
  const { handleLogout, btnRef } = useAuthContext();
  return (
    <div className="container grid place-items-center gap-2 animate-ping-reverse">
      <h1 className="text-center">Welcome</h1>
      <input
        ref={btnRef}
        className="p-2 px-4 mx-auto text-center border-2 rounded-full cursor-pointer bg-slate-800 border-slate-600 transition duration-300 ease-in-out scale-90 hover:scale-100 hover:text-green-600"
        type="button"
        value="Logout"
        onClick={handleLogout}
      />
    </div>
  );
};
