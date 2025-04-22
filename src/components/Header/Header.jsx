import React, { useState, useEffect } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("/");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveItem(window.location.pathname);
  }, []);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <>
      <div className="h-16"></div>

      <header className={`fixed top-0 left-0 right-0 z-50 w-full bg-white ${scrolled ? "shadow-sm border-b border-gray-100" : ""} transition-all duration-200`}>
        <Container>
          <nav className="flex items-center justify-between h-16">
            <div>
              <Link to="/" onClick={() => setActiveItem("/")} className="block py-4">
                <Logo width="110px" />
              </Link>
            </div>

            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-2 mr-6">
                {navItems.map((item) =>
                  item.active ? (
                    <button
                      key={item.name}
                      onClick={() => {
                        navigate(item.slug);
                        setActiveItem(item.slug);
                      }}
                      className={`
                        px-3 py-1.5 text-sm font-medium transition-colors duration-200
                        ${
                          item.slug === activeItem
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-600 hover:text-blue-600"
                        }
                      `}
                    >
                      {item.name}
                    </button>
                  ) : null
                )}
              </div>

              {authStatus && (
                <div className="flex items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium text-sm border border-gray-200">
                      U
                    </div>
                    <LogoutBtn
                      className="py-1.5 px-4 rounded-md text-sm font-medium bg-white text-red-600 border border-red-200 hover:bg-red-50"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="block lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                  />
                </svg>
              </button>
            </div>
          </nav>
        </Container>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="py-2">
              {navItems.map((item) =>
                item.active ? (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.slug);
                      setActiveItem(item.slug);
                      setMobileMenuOpen(false);
                    }}
                    className={`
                      w-full text-left px-6 py-3 text-sm
                      ${
                        item.slug === activeItem
                          ? "text-blue-600 bg-blue-50 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }
                    `}
                  >
                    {item.name}
                  </button>
                ) : null
              )}
            </div>

            {authStatus && (
              <div className="px-6 py-4 border-t border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium text-sm border border-gray-200 mr-3">
                    U
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">User</div>
                    <div className="text-xs text-gray-500">user@example.com</div>
                  </div>
                </div>
                <LogoutBtn className="w-full py-2 px-4 rounded-md text-sm font-medium bg-white text-red-600 border border-red-200 hover:bg-red-50" />
              </div>
            )}
          </div>
        )}
      </header>
    </>
  );
}

export default Header;