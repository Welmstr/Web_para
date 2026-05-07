import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: '首页', path: '/' },
  { label: '团队概况', path: '/about' },
  { label: '团队历程', path: '/team-history' },
  { label: '研究方向', path: '/research' },
  { label: '联系我们', path: '/contact' },
];

const TEAM_LOGO_URL = 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-05-03/1777808171249-正面.png?auth_key=9c25a8f1b638ee34337ce9241b1e44ad7b3e32d552e8adfee6167da788c592cc';

const Layout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#0F172A]' : 'bg-white'}`}>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? isDark 
            ? 'bg-[#0F172A]/90 backdrop-blur-xl border-b border-white/10' 
            : 'bg-white/90 backdrop-blur-xl border-b border-[#1A2639]/5 shadow-sm'
          : isDark
            ? 'bg-transparent'
            : 'bg-white/50'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-md group-hover:shadow-lg transition-shadow flex items-center justify-center">
                <img
                  src={TEAM_LOGO_URL}
                  alt="超算团队"
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <span className={`text-sm font-semibold hidden sm:block transition-colors ${isDark ? 'text-white' : 'text-[#1A2639]'}`}>
                超算团队
              </span>
            </NavLink>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                      isActive 
                        ? isDark
                          ? 'text-white bg-white/10'
                          : 'text-[#1A2639] bg-[#1A2639]/5'
                        : isDark
                          ? 'text-white/50 hover:text-white hover:bg-white/5'
                          : 'text-[#4A5568] hover:text-[#1A2639] hover:bg-[#1A2639]/5'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'text-white/60 hover:text-white hover:bg-white/10' 
                    : 'text-[#718096] hover:text-[#1A2639] hover:bg-[#1A2639]/5'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  isDark 
                    ? 'text-white/60 hover:text-white hover:bg-white/10' 
                    : 'text-[#718096] hover:text-[#1A2639] hover:bg-[#1A2639]/5'
                }`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-t ${
                isDark 
                  ? 'bg-[#0F172A]/95 backdrop-blur-xl border-white/10' 
                  : 'bg-white/95 backdrop-blur-xl border-[#1A2639]/5'
              }`}
            >
              <div className="px-6 py-4 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 px-4 text-sm font-medium rounded-lg transition-colors ${
                        isActive 
                          ? isDark
                            ? 'text-white bg-white/10'
                            : 'text-[#1A2639] bg-[#1A2639]/5'
                          : isDark
                            ? 'text-white/60 hover:text-white hover:bg-white/5'
                            : 'text-[#718096] hover:text-[#1A2639] hover:bg-[#1A2639]/5'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-16">
        <Outlet />
      </main>

      <footer className={`border-t ${isDark ? 'bg-[#1A2639] border-white/10' : 'bg-[#1A2639] border-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-md flex items-center justify-center">
                  <img
                    src={TEAM_LOGO_URL}
                    alt="超算团队"
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <span className="text-sm font-semibold text-white">超算团队</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                面向国家算力基础设施与国产生态建设，深耕国产CPU适配、并行算法优化与高性能应用开发。
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">快速链接</h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink 
                      to={item.path} 
                      className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-4">联系方式</h4>
              <div className="space-y-2 text-sm text-white/50">
                <p>团队地址：明理楼C区1001室</p>
                <p>西南石油大学计算机与软件学院</p>
                <p className="text-[#3498DB]">hpc@swpu.edu.cn</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/30">© 2026 西南石油大学超算与并行计算团队</p>
            <p className="text-xs text-white/30">明德笃志，博学创新</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;