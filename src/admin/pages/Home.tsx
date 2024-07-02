import { useAuthContext } from "../contexts/AuthContext";

export const Home = () => {
  const { handleLogout } = useAuthContext();
  return (
    <div className="container">
      <h1 className="text-center">Welcome</h1>
      <input
        id='logout-btn'
        className="p-2 px-4 mx-auto bg-slate-800 border-2 border-slate-600 rounded-full text-center cursor-pointer transition duration-300 ease-in-out scale-90 hover:scale-100 hover:text-green-600"
        type="button"
        value="Logout"
        onClick={handleLogout}
      />
    </div>
  );
};
