import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Target, Rocket, Lightbulb, Award, Users, ArrowRight, CheckCircle, GraduationCap, Briefcase, MapPin } from 'lucide-react';
import ParticleNetwork from '../components/ParticleNetwork';

const features = [
  { icon: Cpu, title: '国产CPU适配', desc: '深耕国产处理器优化与适配，推动自主可控生态建设' },
  { icon: Target, title: '并行算法优化', desc: '持续提升并行计算性能，突破性能瓶颈' },
  { icon: Rocket, title: '高性能应用开发', desc: '让国产算力跑得更快，服务国家战略需求' }
];

const values = [
  { icon: Lightbulb, title: '明德笃志，博学创新', subtitle: '校训传承' },
  { icon: Award, title: '为祖国加油，为民族争气', subtitle: '团队信念' },
  { icon: Users, title: '以老带新，薪火相传', subtitle: '培养体系' }
];

const stats = [
  { value: 60, label: '累计获奖', suffix: '+' },
  { value: 45, label: '团队成员', suffix: '' },
  { value: 2019, label: '成立年份', suffix: '' }
];

const highlights = [
  '面向国家算力基础设施关键需求',
  '深耕国产CPU适配与优化',
  '并行算法与高性能应用开发',
  '以赛促研、以研促用'
];

const alumniData = [
  {
    year: '2025届',
    members: [
      { name: '张强', type: '保研', destination: '国防科技大学', degree: '硕士', featured: false },
      { name: '赵洪扬', type: '保研', destination: '湖南大学', degree: '硕士', featured: false },
    ]
  },
  {
    year: '2024届',
    members: [
      { name: '夏卓昭', type: '保研', destination: '中国科学技术大学', degree: '硕士', featured: true },
      { name: '王亮', type: '保研', destination: '电子科技大学', degree: '硕士', featured: false },
      { name: '周昕航', type: '考研', destination: '浙江大学', degree: '硕士', featured: true },
    ]
  },
  {
    year: '2023届',
    members: [
      { name: '江国庆', type: '保研', destination: '四川大学', degree: '硕士', featured: false },
      { name: '邢远杰', type: '就业', destination: '阿里达摩院', degree: '', featured: true },
    ]
  },
  {
    year: '2022届',
    members: [
      { name: '马聪', type: '考研', destination: '中国科学院深圳先进技术研究院', degree: '硕士', note: '现于日本北海道大学攻读博士学位', featured: true },
      { name: '张鸿宇', type: '保研', destination: '哈尔滨工业大学', degree: '硕士', note: '现于日本京都大学攻读博士学位', featured: true },
      { name: '涂然', type: '保研', destination: '电子科技大学', degree: '硕士', featured: false },
    ]
  },
  {
    year: '2021届',
    members: [
      { name: '刘成', type: '就业', destination: '中国核工业集团', degree: '', featured: false },
    ]
  },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!inView) return;
    
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
  }, [value, inView]);
  
  return <span>{count}{suffix}</span>;
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="relative mb-12">
      <h2 className="text-display-md text-[#1A2639] tracking-tight pr-16">{title}</h2>
      <div className="absolute bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-[#1A2639] to-[#3498DB] rounded-full" />
      {subtitle && <p className="mt-4 text-[#718096] text-body-md">{subtitle}</p>}
    </div>
  );
}

const getTypeBg = (type: string) => {
  switch (type) {
    case '保研': return 'bg-[#3498DB]/10 text-[#3498DB]';
    case '考研': return 'bg-[#8B5CF6]/10 text-[#8B5CF6]';
    case '就业': return 'bg-[#10B981]/10 text-[#10B981]';
    default: return 'bg-[#1A2639]/5 text-[#718096]';
  }
};

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

export default function About() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <ParticleNetwork />
        
        <motion.div
          className="absolute top-[20%] right-[15%] w-[400px] h-[400px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(52, 152, 219, 0.12) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="relative max-w-6xl mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A2639]/5 border border-[#1A2639]/10 rounded-full mb-8">
              <div className="w-1.5 h-1.5 bg-[#3498DB] rounded-full animate-pulse" />
              <span className="text-xs text-[#4A5568] font-medium">团队概况</span>
            </div>
            
            <h1 className="text-display-lg md:text-display-xl tracking-tight">
              <span className="text-[#1A2639]">面向国家算力</span>
              <br />
              <span className="text-gradient-accent">基础设施</span>
            </h1>
            
            <p className="mt-6 text-body-lg text-[#4A5568] leading-relaxed max-w-2xl">
              团队成员始终把"真实技术痛点"当作课题，在一次次性能调优与工程验证中，让国产算力"跑得更快、用得更稳"。
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={statsRef} className="py-16 bg-[#F4F6F9]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="text-display-md text-[#1A2639] mb-2 stat-number font-bold">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={statsInView} />
                </div>
                <div className="text-sm text-[#718096] font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionTitle title="我们的使命" />
              <p className="text-[#4A5568] leading-relaxed mb-4 text-body-md">
                坚持"以赛促研、以研促用"，把赛场上的优化经验沉淀为可复用的方法与成果。
              </p>
              <p className="text-[#4A5568] leading-relaxed mb-8 text-body-md">
                面向国家算力基础设施与国产生态建设的关键需求，深耕国产CPU适配、并行算法优化与高性能应用开发。
              </p>
              
              <div className="space-y-4 mb-8">
                {highlights.map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#3498DB]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-[#3498DB]" />
                    </div>
                    <span className="text-sm text-[#4A5568]">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              <a href="#/team-history" className="inline-flex items-center gap-1.5 text-[#718096] text-sm font-medium hover:text-[#1A2639] transition-colors group">
                查看团队历程 <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-elevated card-glass">
                <img
                  src="https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-24/1777001900586-77A342F8B286FA586368C0087435F482.jpg?auth_key=d0657dec379d075474b1716e1129974fab3d502635b0840f8ddc96867754d04f"
                  alt="团队大合照"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F4F6F9]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle title="研究方向" subtitle="聚焦核心技术领域，推动国产算力发展" />
          
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="card-glass group p-8 bg-white"
                whileHover={{ y: -6 }}
              >
                <div className="w-14 h-14 bg-[#1A2639]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1A2639] transition-colors duration-300">
                  <f.icon className="w-7 h-7 text-[#1A2639] group-hover:text-white transition-colors" />
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
          <SectionTitle title="团队文化" subtitle="传承与创新，铸就团队精神" />

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="card-glass group p-8 bg-[#F4F6F9]"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#3498DB]/10 rounded-xl flex items-center justify-center">
                    <v.icon className="w-6 h-6 text-[#3498DB]" />
                  </div>
                  <span className="text-xs text-[#A0AEC0] font-medium">{v.subtitle}</span>
                </div>
                <h3 className="text-heading-md text-[#1A2639]">{v.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#F4F6F9]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle title="往届优秀队员" subtitle="从这里出发，走向更广阔的舞台" />

          <div className="space-y-8">
            {alumniData.map((group) => (
              <div key={group.year}>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-heading-md text-[#1A2639]">{group.year}</h3>
                  <div className="flex-1 h-px bg-[#1A2639]/10" />
                </div>

                <div className={`grid gap-4 ${group.members.length === 1 ? 'grid-cols-1 max-w-md' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                  {group.members.map((member) => {
                    const TypeIcon = member.type === '就业' ? Briefcase : GraduationCap;
                    return (
                      <div
                        key={member.name}
                        className="card-glass p-5 bg-white"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#1A2639]/5 flex items-center justify-center flex-shrink-0">
                            <span className="text-base font-semibold text-[#1A2639]">{member.name[0]}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-[#1A2639]">{member.name}</span>
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${getTypeBg(member.type)}`}>
                                {member.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1 text-xs text-[#718096]">
                              <MapPin className="w-3 h-3" />
                              <span>{member.destination}</span>
                              {member.degree && <span className="text-[#A0AEC0]">· {member.degree}</span>}
                            </div>
                          </div>
                        </div>
                        {member.note && (
                          <p className="text-xs text-[#8B5CF6] mt-3 pl-[52px]">
                            {member.note}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <span className="text-xs text-[#A0AEC0]">更多优秀队员持续更新中...</span>
          </div>
        </div>
      </section>
    </div>
  );
}