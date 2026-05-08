import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Users, Clock, MessageCircle, Code, Heart, Github } from 'lucide-react';

const contactInfo = [
  { icon: MapPin, label: '团队地址', value: '明理楼C区1001室' },
  { icon: Mail, label: '联系邮箱', value: 'hpc@swpu.edu.cn' },
  { icon: Users, label: '招新QQ群', value: '欢迎加入招新QQ群咨询' },
  { icon: Clock, label: '工作时间', value: '周一至周日 9:00-21:00' },
];

const wechatAccount = {
  label: '微信公众号',
  value: '关注团队最新动态',
  link: 'https://mp.weixin.qq.com/s/1EhZPff4UQgkJx3LMuOZYQ'
};

const ojPlatform = {
  label: 'OJ习题练习平台',
  value: '在线编程训练与算法练习',
  link: 'https://oj.swpupara.cn/'
};

const githubRepo = {
  label: '团队仓库地址',
  value: 'github.com/SWPU-PARA',
  link: 'https://github.com/SWPU-PARA'
};

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="relative mb-12">
      <h2 className="text-display-md text-[#1A2639] tracking-tight pr-16">{title}</h2>
      <div className="absolute bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-[#1A2639] to-[#3498DB] rounded-full" />
      {subtitle && <p className="mt-4 text-[#718096] text-body-md">{subtitle}</p>}
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="ripple-container">
          <div className="ripple-ring" />
          <div className="ripple-ring" />
          <div className="ripple-ring" />
          <div className="ripple-ring" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A2639]/5 border border-[#1A2639]/10 rounded-full mb-8">
              <div className="w-1.5 h-1.5 bg-[#3498DB] rounded-full animate-pulse" />
              <span className="text-xs text-[#4A5568] font-medium">联系我们</span>
            </div>
            
            <h1 className="text-display-lg md:text-display-xl tracking-tight">
              <span className="text-[#1A2639]">期待你的</span>
              <br />
              <span className="text-gradient-accent">加入</span>
            </h1>
            
            <p className="mt-6 text-body-lg text-[#4A5568] leading-relaxed max-w-2xl">
              欢迎加入超算与并行计算团队，一起探索高性能计算的无限可能
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#F4F6F9]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="card-glass group p-7 bg-white"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1A2639]/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A2639] transition-colors duration-300">
                    <item.icon className="w-6 h-6 text-[#1A2639] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A2639] text-base mb-1">{item.label}</h3>
                    <p className="text-[#718096] text-sm">{item.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.a
              href={wechatAccount.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="card-glass group p-7 cursor-pointer bg-white"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#10B981] transition-colors duration-300">
                  <MessageCircle className="w-6 h-6 text-[#10B981] group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[#1A2639] text-base">{wechatAccount.label}</h3>
                    <svg className="w-4 h-4 text-[#A0AEC0] group-hover:text-[#3498DB] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <p className="text-[#718096] text-sm">{wechatAccount.value}</p>
                </div>
              </div>
            </motion.a>

            <motion.a
              href={ojPlatform.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="card-glass group p-7 cursor-pointer bg-white"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#8B5CF6] transition-colors duration-300">
                  <Code className="w-6 h-6 text-[#8B5CF6] group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[#1A2639] text-base">{ojPlatform.label}</h3>
                    <svg className="w-4 h-4 text-[#A0AEC0] group-hover:text-[#3498DB] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <p className="text-[#718096] text-sm">{ojPlatform.value}</p>
                </div>
              </div>
            </motion.a>

            <motion.a
              href={githubRepo.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="card-glass group p-7 cursor-pointer bg-white"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1A2639]/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A2639] transition-colors duration-300">
                  <Github className="w-6 h-6 text-[#1A2639] group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[#1A2639] text-base">{githubRepo.label}</h3>
                    <svg className="w-4 h-4 text-[#A0AEC0] group-hover:text-[#3498DB] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <p className="text-[#718096] text-sm">{githubRepo.value}</p>
                </div>
              </div>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 text-[#A0AEC0] text-sm">
              <Heart className="w-4 h-4 text-[#F59E0B]" />
              <span>期待和你一起优化下一段代码</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}