import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Trophy, ArrowRight, ChevronRight, MapPin, Mail, Calendar, Zap, Brain, Server } from 'lucide-react';

const stats = [
  { label: '成立年份', value: 2019, suffix: '' },
  { label: '累计获奖', value: 60, suffix: '+' },
  { label: '团队规模', value: 45, suffix: '人' },
  { label: '国际荣誉', value: 8, suffix: '项' },
];

const features = [
  { icon: Cpu, title: 'GPU 异构架构', desc: 'CUDA/HIP, Kernel 级别优化', tag: '核心技术' },
  { icon: Server, title: '国产CPU适配', desc: '深耕国产处理器生态，推动自主可控', tag: '战略方向' },
  { icon: Brain, title: 'AI Infra 研究', desc: '大模型训练优化与推理加速', tag: '前沿探索' },
];

const hpcPath = [
  { level: '01', title: '编程语言基础', desc: 'C/C++、Python 开发基础' },
  { level: '02', title: '体系结构基础', desc: 'CPU架构、内存层次、缓存优化' },
  { level: '03', title: '多核开发模型', desc: 'OpenMP/MPI 并行编程' },
  { level: '04', title: '异构编程基础', desc: 'CUDA/HIP GPU编程' },
];

const aiInfraPath = [
  { level: '01', title: '计算机体系结构基础', desc: '理解硬件与软件协同' },
  { level: '02', title: '大模型发展简史', desc: '从 GPT 到 LLaMA 的演进' },
  { level: '03', title: '大模型基础', desc: '训练优化与推理加速' },
];

const convergenceNode = {
  title: '实战应用',
  desc: 'ASC/CPC 超算竞赛、大模型部署优化等综合实践',
  items: ['ASC/CPC 超算竞赛', '大模型部署优化', '异构计算实战', '性能调优项目']
};

const highlights = [
  { title: 'ASC国际一等奖', year: '2024', desc: '世界大学生超级计算机竞赛一等奖' },
  { title: 'CPC金奖', year: '2019', desc: '国产CPU并行应用挑战赛金奖' },
  { title: '飞翔奖最佳团队', year: '2024', desc: '第九届飞翔奖最佳团队奖' },
];

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

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 1500;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-display-md text-[#1A2639] mb-2 stat-number">
      {count}{suffix}
    </span>
  );
}

function SectionTitle({ children, subtitle, centered }: { children: React.ReactNode; subtitle?: string; centered?: boolean }) {
  return (
    <div className={centered ? 'text-center' : ''}>
      <h2 className="text-display-md text-[#1A2639] tracking-tight section-title inline-block">
        {children}
      </h2>
      {subtitle && <p className="mt-3 text-[#718096] text-body-md">{subtitle}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute inset-0 hero-grid opacity-60" />
        
        <motion.div
          className="absolute top-[15%] right-[10%] w-[500px] h-[500px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(52, 152, 219, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(26, 38, 57, 0.1) 0%, transparent 70%)',
            filter: 'blur(50px)'
          }}
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-32 w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-3xl"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-[#1A2639]/10 rounded-full mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="w-1.5 h-1.5 bg-[#3498DB] rounded-full animate-pulse" />
              <span className="text-xs text-[#4A5568] font-medium">西南石油大学 · 计算机与软件学院</span>
            </motion.div>

            <motion.h1 
              className="text-display-lg md:text-display-xl tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="text-[#1A2639]">超算与并行计算</span>
              <br />
              <span className="text-gradient-accent">团队</span>
            </motion.h1>

            <motion.p 
              className="mt-6 text-body-lg text-[#4A5568] max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              突破算力边界，深耕底层架构。面向国家算力基础设施关键需求，推动国产算力生态建设。
            </motion.p>

            <motion.div 
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.a 
                href="#/contact" 
                className="btn-primary group inline-flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                加入团队
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.a>
              <motion.a 
                href="#/research" 
                className="btn-secondary inline-flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                研究方向
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div 
            className="w-6 h-10 border border-[#1A2639]/20 rounded-full flex justify-center pt-2 bg-white/50 backdrop-blur-sm"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div 
              className="w-1 h-2 bg-[#3498DB] rounded-full"
              animate={{ opacity: [0.3, 0.8, 0.3], y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[#F4F6F9]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <div className="text-sm text-[#718096] font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F4F6F9]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <SectionTitle>核心方向</SectionTitle>
            <p className="mt-3 text-[#718096] text-body-md">深耕底层，追求极致性能</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                className="card-elevated group p-8"
                whileHover={{ y: -6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-[#1A2639]/5 rounded-2xl flex items-center justify-center group-hover:bg-[#1A2639] transition-colors duration-300">
                    <f.icon className="w-7 h-7 text-[#1A2639] group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs text-[#A0AEC0] font-medium">{f.tag}</span>
                </div>
                
                <h3 className="text-heading-md text-[#1A2639] mb-2">{f.title}</h3>
                <p className="text-body-sm text-[#718096] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <SectionTitle centered>成长路径</SectionTitle>
            <p className="mt-3 text-[#718096] text-body-md">双轨汇聚，实战成才</p>
          </motion.div>

          <div className="relative">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-5">
                  <h3 className="text-heading-lg text-[#1A2639] mb-1">HPC 培养路线</h3>
                  <p className="text-body-sm text-[#718096]">高性能计算核心能力</p>
                </div>
                <div className="relative pl-7">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#3498DB]/60 via-[#3498DB]/30 to-transparent" />
                  <div className="space-y-4">
                    {hpcPath.map((item, i) => (
                      <motion.div
                        key={item.level}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="relative group"
                      >
                        <div className="absolute left-[-22px] top-4 w-2.5 h-2.5 bg-[#3498DB] rounded-full ring-4 ring-[#3498DB]/10" />
                        <div className="card-glass p-4">
                          <span className="text-xs font-mono text-[#3498DB] font-medium">{item.level}</span>
                          <h4 className="text-sm font-semibold text-[#1A2639] mt-1 mb-1">{item.title}</h4>
                          <p className="text-xs text-[#718096]">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-5">
                  <h3 className="text-heading-lg text-[#1A2639] mb-1">AI Infra 培养路线</h3>
                  <p className="text-body-sm text-[#718096]">大模型基础设施</p>
                </div>
                <div className="relative pl-7">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#8B5CF6]/60 via-[#8B5CF6]/30 to-transparent" />
                  <div className="space-y-4">
                    {aiInfraPath.map((item, i) => (
                      <motion.div
                        key={item.level}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="relative group"
                      >
                        <div className="absolute left-[-22px] top-4 w-2.5 h-2.5 bg-[#8B5CF6] rounded-full ring-4 ring-[#8B5CF6]/10" />
                        <div className="card-glass p-4">
                          <span className="text-xs font-mono text-[#8B5CF6] font-medium">{item.level}</span>
                          <h4 className="text-sm font-semibold text-[#1A2639] mt-1 mb-1">{item.title}</h4>
                          <p className="text-xs text-[#718096]">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="relative flex justify-center mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3498DB] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#3498DB]/20"
              >
                <Zap className="w-7 h-7 text-white" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="card-elevated p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#3498DB] to-[#8B5CF6] rounded-2xl flex items-center justify-center shadow-lg">
                    <Trophy className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-heading-lg text-[#1A2639]">{convergenceNode.title}</h3>
                    <p className="text-body-sm text-[#718096] mt-0.5">{convergenceNode.desc}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {convergenceNode.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 * i }}
                      className="flex items-center gap-2.5 p-3.5 bg-[#F4F6F9] rounded-xl"
                    >
                      <div className="w-1.5 h-1.5 bg-[#3498DB] rounded-full" />
                      <span className="text-sm text-[#4A5568]">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F4F6F9]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <SectionTitle>荣誉成果</SectionTitle>
            <p className="mt-3 text-[#718096] text-body-md">在国内外顶级超算赛事中屡创佳绩</p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="card-elevated group p-8"
                whileHover={{ y: -6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#3498DB]/10 to-[#3498DB]/5 rounded-2xl flex items-center justify-center">
                    <Trophy className="w-7 h-7 text-[#3498DB]" />
                  </div>
                  <span className="text-xs text-[#A0AEC0] font-mono">{item.year}</span>
                </div>
                <h3 className="text-heading-md text-[#1A2639] mb-2">{item.title}</h3>
                <p className="text-body-sm text-[#718096]">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <motion.a
              href="#/team-history"
              className="inline-flex items-center gap-1.5 text-[#718096] text-sm font-medium hover:text-[#1A2639] transition-colors group"
              whileHover={{ x: 4 }}
            >
              查看全部成果 
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-display-sm text-[#1A2639] mb-5 leading-relaxed">
              一个人可以优化一段代码，<br />一群人能够重建计算的法则。
            </h2>
            <p className="text-body-md text-[#718096]">
              寻找想和我们一起做点大事的你。
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-[#F4F6F9]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-10 text-sm">
            <motion.div 
              className="flex items-center gap-2.5 text-[#718096] group cursor-default"
              whileHover={{ color: '#1A2639' }}
            >
              <div className="w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-white transition-colors shadow-sm">
                <MapPin className="w-4 h-4 text-[#3498DB]" />
              </div>
              <span className="font-medium">明理楼C区1001室</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2.5 text-[#718096] group cursor-default"
              whileHover={{ color: '#1A2639' }}
            >
              <div className="w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-white transition-colors shadow-sm">
                <Mail className="w-4 h-4 text-[#3498DB]" />
              </div>
              <span className="font-medium">hpc@swpu.edu.cn</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2.5 text-[#718096] group cursor-default"
              whileHover={{ color: '#1A2639' }}
            >
              <div className="w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-white transition-colors shadow-sm">
                <Calendar className="w-4 h-4 text-[#3498DB]" />
              </div>
              <span className="font-medium">周一至周日 9:00-21:00</span>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="#/contact"
              className="btn-accent inline-flex items-center gap-2 text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              加入团队 <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}