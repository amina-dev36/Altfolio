import React, { useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { Lightbulb, Moon, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const { signInWithGoogle, signOut, user } = useAuth();
  const { lightMode, toggleTheme } = useContext(ThemeContext);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center py-4 px-4 md:px-8 dark:bg-dark bg-gray-50 border-b-2 dark:border-light border-primary">
      <Link to="/" className="flex items-center gap-2 text-white">
        <img
          src={assets.altfolio}
          alt="Logo"
          className="w-12 h-12 md:w-16 md:h-16"
        />
        <p className="text-lg dark:text-white text-primary md:text-2xl font-bold cursor-pointer ">
          Altfolio
        </p>
      </Link>

      <div className="hidden md:flex items-center justify-center">
        <ul className="flex gap-4 dark:text-white text-primary font-semibold text-sm md:text-lg">
          <li className="border-r dark:border-light border-primary pr-4 active:text-medium hover:text-light">
            <Link to="/">Home</Link>
          </li>
          <li className="border-r dark:border-light border-primary pr-4 active:text-medium hover:text-light">
            <Link to="/market">Market</Link>
          </li>
          {user && (
            <li className="border-r dark:border-light border-primary pr-4 active:text-medium hover:text-light">
              <Link to="/portfolio">Portfolio</Link>
            </li>
          )}

          <li className="active:text-medium hover:text-light">
            <Link to="/news">News</Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <div>
          {lightMode ? (
            <button onClick={toggleTheme} className="text-white">
              <Moon className="w-6 h-6 dark:text-white text-primary md:w-8 md:h-8 cursor-pointer" />
            </button>
          ) : (
            <button onClick={toggleTheme} className="text-white">
              <Lightbulb className="w-6 h-6 md:w-8 md:h-8 cursor-pointer" />
            </button>
          )}
        </div>

        {user ? (
          <button
            onClick={signOut}
            className="bg-light text-dark px-4 py-2 rounded-full font-semibold dark:hover:bg-dark hover:bg-gray-50 hover:ring-2 dark:hover:ring-light hover:ring-primary dark:hover:text-white hover:text-primary cursor-pointer transition duration-300 shadow-lg md:px-8 md:py-4"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="bg-light text-dark px-4 py-2 rounded-full font-semibold dark:hover:bg-dark hover:bg-gray-50 hover:ring-2 dark:hover:ring-light hover:ring-primary dark:hover:text-white hover:text-primary cursor-pointer transition duration-300 shadow-lg md:px-8 md:py-4"
          >
            Sign In
          </button>
        )}

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            <Menu className="w-6 h-6 dark:text-white text-primary md:w-8 md:h-8 cursor-pointer" />
          </button>
          {mobileMenuOpen && (
            <div className="fixed  top-0 right-0 dark:bg-dark bg-gray-50 w-full h-full py-10 shadow-lg">
              <button
                onClick={toggleMobileMenu}
                className="absolute top-4 right-4 dark:text-white text-primary"
                aria-label="Close Menu"
              >
                <X className="w-6 h-6 md:w-8 md:h-8 cursor-pointer" />
              </button>
              <ul className="flex flex-col mt-5 dark:text-white text-primary font-semibold text-sm">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <li className="border-b dark:border-light border-primary py-2 px-4 hover:bg-light hover:text-dark">
                    Home
                  </li>
                </Link>
                <Link to="/market" onClick={() => setMobileMenuOpen(false)}>
                  <li className="border-b dark:border-light border-primary py-2 px-4 hover:bg-light hover:text-dark">
                    Market
                  </li>
                </Link>
                {user && (
                  <Link
                    to="/portfolio"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <li className="border-b dark:border-light border-primary py-2 px-4 hover:bg-light hover:text-dark">
                      Portfolio
                    </li>
                  </Link>
                )}
                <Link to="/news" onClick={() => setMobileMenuOpen(false)}>
                  <li className="border-b dark:border-light border-primary py-2 px-4 hover:bg-light hover:text-dark">
                    News
                  </li>
                </Link>
                <li className="py-2 px-2">
                  {user ? (
                    <button
                      onClick={signOut}
                      className="bg-light w-full text-dark px-4 py-2 rounded-full font-semibold dark:hover:bg-dark hover:bg-gray-50 hover:ring-2 dark:hover:ring-light hover:ring-primary dark:hover:text-white hover:text-primary cursor-pointer transition duration-300 shadow-lg md:px-8 md:py-4"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <button
                      onClick={signInWithGoogle}
                      className="bg-light w-full text-dark px-4 py-2 rounded-full font-semibold dark:hover:bg-dark hover:bg-gray-50 hover:ring-2 dark:hover:ring-light hover:ring-primary dark:hover:text-white hover:text-primary cursor-pointer transition duration-300 shadow-lg md:px-8 md:py-4"
                    >
                      Sign In
                    </button>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
