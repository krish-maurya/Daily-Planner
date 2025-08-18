import React from 'react';
import { ArrowRight, Sparkles, Clock, CheckCircle, Menu, X } from 'lucide-react';
import image from "./utils/MacBook Air - 1.png"
import { useNavigate } from 'react-router-dom';

interface LandingPageProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/login", { state: { isLogin: false } });
  };

  return (
    <section
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden flex items-center justify-center text-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-black font-display fascinate-regular">Milo.</span>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={handleLogin} className="text-black/90 hover:text-black transition-colors duration-300">
              Login
            </button>
            <button onClick={handleSignUp} className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all duration-300 border border-gray-300 shadow-sm hover:shadow-md">
              Sign Up
            </button>
          </div>

          <button
            className="md:hidden text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <div className="relative z-10 mt-20 px-6">
        <div className="inline-flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2 mb-8 border border-gray-200">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-black/90">Day Organizer</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-black mb-3 leading-tight tracking-tight staatliches">
          The simple way to{" "}
          <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
            plan your day
          </span>
        </h1>

        <p className="text-lg md:text-xl text-black/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
          Fully managed daily planning service and organization
          <br />
          platform for teams of all industries.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
          <button onClick={handleNavigate} className="group bg-black text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/30 transform transition-all duration-300 flex items-center space-x-2">
            <span>Get Started</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>

  );
};

export default LandingPage;