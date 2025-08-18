import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import SignUP from "./SignUP";
import { useAuth } from "../../AuthContext";
import Cookie from "js-cookie";
import { Toast } from "./Toast";


interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
  general?: string;
}

interface SignUpProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginPage() {
  const { login } = useAuth();
  const host = import.meta.env.HOST;
  const navigate = useNavigate();
  const location = useLocation();


  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isLogin, setIsLogin] = useState<boolean>(location.state?.isLogin ?? true);
  const [showToast, setShowToast] = useState(false);



  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleDashboard = async (): Promise<void> => {
    try {
      const response = await fetch(`${host}auth/dashboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/app");
      } else {
        setErrors({ general: data.message });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (): Promise<void> => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await fetch(`${host}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        Cookie.set("token", data.token, { secure: true, sameSite: "Strict" });
        login(data.token);
        navigate("/app");
      } else {
        setErrors({ general: data.message || "Login failed" });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };


  const handleForgetPassword = async (): Promise<void> => {
    if (!formData.email) {
      setErrors({ email: "Please enter email" });
      return;
    }

    try {
      setErrors({});
      const response = await fetch(`${host}auth/send-reset-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (response.ok) {
        setShowToast(true);
      } else {
        setErrors({ general: data.message || "Failed to send reset email" });
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setErrors({ general: "Something went wrong. Try again later." });
    }
  };

  return (
    <>
      {isLogin ? (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl grid items-center">
            <div className="w-full max-w-md mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
                <div className="hidden lg:block text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Sign In
                  </h2>
                  <p className="text-gray-600">
                    Enter your credentials to access your account
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === "Enter") handleLogin();
                        }}
                        className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.password ? "border-red-500" : "border-gray-300"
                          }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>

                  {/* Forgot password */}
                  <div className="flex items-center justify-between">
                    <button
                      className="text-sm text-blue-600 hover:text-blue-500 font-medium cursor-pointer"
                      onClick={handleForgetPassword}
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* General error */}
                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                      <p className="text-red-700 text-sm">{errors.general}</p>
                    </div>
                  )}

                  {/* Login button */}
                  <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform disabled:transform-none font-medium text-lg flex items-center justify-center group"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                      </>
                    )}
                  </button>

                  {/* Sign up toggle */}
                  <div className="text-center pt-4">
                    <p className="text-gray-600">
                      Don't have an account?{" "}
                      <button
                        className="text-blue-600 hover:text-blue-500 font-medium underline cursor-pointer"
                        onClick={() => setIsLogin(false)}
                      >
                        Create one now
                      </button>
                    </p>
                    {showToast && (<Toast message="Email is sent" duration={3000}  />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SignUP setIsLogin={setIsLogin} />
      )}
    </>
  );
}
