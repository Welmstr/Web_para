import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: '成立年份', value: '2019' },
  { label: '累计获奖', value: '60', unit: '+' },
  { label: '团队成员', value: '45', unit: '人' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920')] bg-cover bg-center opacity-20" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-xl sm:text-2xl text-blue-100 mb-4 tracking-wider">
            超算与并行计算团队
          </h2>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-8">
            为祖国加油，为民族争气
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-12">
            面向国家算力基础设施与国产生态建设，深耕国产CPU适配、并行算法优化与高性能应用开发
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                {stat.value}{stat.unit}
              </div>
              <div className="text-blue-200 text-sm sm:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
