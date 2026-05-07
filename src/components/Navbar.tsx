import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: '首页', path: '/' },
  { label: '团队概况', path: '/about' },
  { label: '团队历程', path: '/team-history' },
  { label: '研究方向', path: '/research' },
  { label: '联系我们', path: '/contact' },
];

const TEAM_LOGO_URL = 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-05-03/1777808171249-正面.png?auth_key=9c25a8f1b638ee34337ce9241b1e44ad7b3e32d552e8adfee6167da788c592cc';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-r from-[#0a1628] via-[#1e3a8a] to-[#0f2744] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white/95 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <img
                src={TEAM_LOGO_URL}
                alt="超算团队"
                className="w-full h-full object-contain p-1"
              />
            </div>
            <span className="font-bold text-lg text-white hidden sm:block">
              超算团队
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-[#3b82f6]/30 text-white border border-[#3b82f6]/50'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-[#0a1628] via-[#1e3a8a] to-[#0f2744] border-t border-white/10 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-[#3b82f6]/30 text-white border border-[#3b82f6]/50'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}