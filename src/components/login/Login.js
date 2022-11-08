import React from "react";
import { useNavigate } from "react-router-dom";
import bgimage from "../../assets/img/bg-image.jpg";
function Login() {
  let navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/dashboard");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block bg-gray-100">
        <img className="max-w-full h-full " src={bgimage} alt="Hello" />
      </div>

      <div className="bg-gray-100 flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto bg-white p-4">
          <h2 className="text-4xl font-bold text-center py-6">PolicyMaker</h2>
          <div className="flex flex-col py-2">
            <label>Username</label>

            <input className="border p-2" type="text" />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input className="border p-2" type="password" />
          </div>
          <button
            onClick={handleSubmit}
            className="border w-full my-5 py-2 bg-gray-600 hover:bg-gray-500 text-white"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
