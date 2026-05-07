import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Cpu, Brain } from 'lucide-react';

const researchAreas = [
  {
    title: '高性能计算',
    subtitle: 'High Performance Computing',
    description: '面向国家算力基础设施的关键需求，深耕国产CPU适配、并行算法优化与高性能应用开发。',
    techs: ['MPI', 'OpenMP', 'CUDA', 'OpenCL', '国产CPU'],
    applications: ['科学计算', '工程仿真', '气候模拟', '基因测序'],
    icon: Cpu
  },
  {
    title: 'AI Infra',
    subtitle: 'AI Infrastructure',
    description: '构建高效AI训练与推理基础设施，优化大模型并行训练与部署。',
    techs: ['PyTorch', 'TensorFlow', 'NCCL', 'DeepSpeed', 'vLLM'],
    applications: ['大模型训练', '推理加速', '算子优化', '分布式训练'],
    icon: Brain
  }
];

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
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
};

export default function Research() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <motion.div
          className="absolute top-[15%] right-[10%] w-[400px] h-[400px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(52, 152, 219, 0.12) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
              <span className="text-xs text-[#4A5568] font-medium">研究方向</span>
            </div>
            
            <h1 className="text-display-lg md:text-display-xl tracking-tight">
              <span className="text-[#1A2639]">聚焦前沿</span>
              <br />
              <span className="text-gradient-accent">技术领域</span>
            </h1>
            
            <p className="mt-6 text-body-lg text-[#4A5568] leading-relaxed max-w-2xl">
              推动国产算力发展，在高性能计算与AI基础设施领域持续深耕
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-[#F4F6F9]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="grid lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {researchAreas.map((area) => (
              <motion.div
                key={area.title}
                variants={itemVariants}
                className="card-glass group overflow-hidden bg-white"
                whileHover={{ y: -6 }}
              >
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-[#1A2639]/5 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#1A2639] transition-colors duration-300">
                      <area.icon className="w-7 h-7 text-[#1A2639] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h2 className="text-heading-lg text-[#1A2639]">{area.title}</h2>
                      <p className="text-xs text-[#A0AEC0] mt-1 font-mono">{area.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-[#4A5568] leading-relaxed mb-6 text-body-md">{area.description}</p>

                  <div className="mb-6">
                    <h3 className="text-xs font-semibold text-[#718096] mb-3 uppercase tracking-wider">技术栈</h3>
                    <div className="flex flex-wrap gap-2">
                      {area.techs.map((tech) => (
                        <span 
                          key={tech} 
                          className="ghost-tag"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-[#718096] mb-3 uppercase tracking-wider">应用场景</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {area.applications.map((app) => (
                        <div key={app} className="flex items-center gap-2.5 text-[#4A5568]">
                          <div className="w-4 h-4 rounded-full bg-[#3498DB]/10 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-2.5 h-2.5 text-[#3498DB]" />
                          </div>
                          <span className="text-sm">{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}