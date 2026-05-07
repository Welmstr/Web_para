import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Code, Award, Users, ArrowRight } from 'lucide-react';

const recruitmentInfo = [
  {
    icon: FileText,
    title: '普通招新',
    subtitle: '上机考试',
    description: '我们将重点考察你的代码水平，考试内容为C语言基础，考试范围为字符串到指针部分',
    color: 'bg-[#3498DB]/10 text-[#3498DB]'
  },
  {
    icon: Code,
    title: '特殊招新',
    subtitle: '综合考察',
    description: '我们将更加注重你的工程能力，我们将结合实际情境考验你在问题分析、数据处理、代码架构、报告汇编等各方面能力，进行综合评判，择优录取',
    color: 'bg-[#8B5CF6]/10 text-[#8B5CF6]'
  }
];

const process = [
  { step: '01', title: '报名', desc: '关注招新公告，提交报名信息' },
  { step: '02', title: '考核', desc: '参加普通招新与特殊招新考核' },
  { step: '03', title: '面试', desc: '成绩优秀者进入面试环节' },
  { step: '04', title: '入选', desc: '通过面试后正式加入团队' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
};

export default function Recruitment() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="relative max-w-6xl mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A2639]/5 border border-[#1A2639]/10 rounded-full mb-8">
              <div className="w-1.5 h-1.5 bg-[#3498DB] rounded-full animate-pulse" />
              <span className="text-xs text-[#4A5568] font-medium">招新策略</span>
            </div>
            
            <h1 className="text-display-lg md:text-display-xl tracking-tight text-[#1A2639]">
              诚邀有志于高性能计算<br />与人工智能的同学
            </h1>
            
            <p className="mt-6 text-body-lg text-[#4A5568] leading-relaxed max-w-2xl mx-auto">
              加入我们，一起探索HPC与AI Infra的无限可能
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[#F8FAFB]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-display-sm text-[#1A2639] tracking-tight">考核方式</h2>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {recruitmentInfo.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="card-white p-8"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-heading-lg text-[#1A2639] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#718096] mb-3">{item.subtitle}</p>
                    <p className="text-[#4A5568] text-body-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="card-white p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-[#3498DB]" />
              <h3 className="text-heading-lg text-[#1A2639]">考核占比说明</h3>
            </div>
            <p className="text-[#4A5568] leading-relaxed text-body-md">
              普通招新与特殊招新在考核占比会根据每年进行一定调整，历年与最新消息请关注微信公众号。
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F8FAFB]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-display-sm text-[#1A2639] tracking-tight">招新流程</h2>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {process.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative"
              >
                <div className="card-white p-6 text-center">
                  <div className="w-12 h-12 bg-[#1A2639] rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">{item.step}</span>
                  </div>
                  <h3 className="text-heading-md text-[#1A2639] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#718096]">{item.desc}</p>
                </div>
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#1A2639]/10" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-[#1A2639] rounded-2xl p-12 text-center text-white">
            <Users className="w-12 h-12 mx-auto mb-4 text-[#3498DB]" />
            <h3 className="text-display-sm mb-3">期待你的加入</h3>
            <p className="text-white/60 text-body-md mb-6">与我们一起探索HPC & AI Infra 的无限可能</p>
            <motion.a
              href="#/contact"
              className="btn-accent inline-flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              立即报名 <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}