import { useState } from "react";
import { useNavigate } from "react-router-dom";

const users = [
  {
    id: 1,
    name: "Mohd Saquib",
    email: "saquib@test.com",
    password: "123456",
    role: "student",
  },
  {
    id: 2,
    name: "Rahul",
    email: "rahul@test.com",
    password: "123456",
    role: "student",
  },
  {
    id: 3,
    name: "Aman",
    email: "aman@test.com",
    password: "123456",
    role: "student",
  },
  {
    id: 4,
    name: "Dr. Sharma",
    email: "professor@test.com",
    password: "123456",
    role: "professor",
  },
];

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const user = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    if (user.role === "professor") {
      navigate("/professor/dashboard");
    } else {
      navigate("/student/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-slate-800 text-center">
          Welcome Back
        </h1>

        <p className="text-slate-500 text-center mt-2">
          Login to your account
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Demo Accounts */}
        <div className="mt-6 rounded-lg bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-700 mb-2">
            Demo Accounts
          </p>

          <p className="text-xs text-slate-500">
            Student: saquib@test.com
          </p>

          <p className="text-xs text-slate-500">
            Student: rahul@test.com
          </p>

          <p className="text-xs text-slate-500">
            Student: aman@test.com
          </p>

          <p className="text-xs text-slate-500">
            Professor: professor@test.com
          </p>

          <p className="text-xs text-slate-500 mt-2">
            Password: 123456
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;