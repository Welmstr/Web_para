import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0a1628] via-[#1e3a8a] to-[#0f2744] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#3b82f6]">超算与并行计算团队</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              西南石油大学计算机与软件学院<br />
              面向国家算力基础设施与国产生态建设
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#3b82f6]">联系方式</h4>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#3b82f6]" />
                <span>四川省成都市新都区新都大道8号</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#3b82f6]" />
                <span>hpc-team@swpu.edu.cn</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#3b82f6]" />
                <span>028-83032116</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#3b82f6]">快速链接</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="#/about" className="hover:text-[#3b82f6] transition-colors">关于我们</a></li>
              <li><a href="#/team-history" className="hover:text-[#3b82f6] transition-colors">成长历程</a></li>
              <li><a href="#/research" className="hover:text-[#3b82f6] transition-colors">研究方向</a></li>
              <li><a href="#/contact" className="hover:text-[#3b82f6] transition-colors">联系我们</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/50 text-sm">
          <p>© 2024 西南石油大学超算与并行计算团队 版权所有</p>
          <p className="mt-1">明德笃志，博学创新 | 为祖国加油，为民族争气</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;