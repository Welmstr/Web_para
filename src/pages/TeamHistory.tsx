import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Users, Award, Medal, Star, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

const stats = [
  { label: '累计获奖', value: 60, suffix: '+', icon: Trophy, desc: '国内外顶级赛事获奖' },
  { label: '国际赛事', value: 10, suffix: '+', icon: Medal, desc: '参与国际级比赛' },
  { label: '最佳团队奖', value: 1, suffix: '项', icon: Award, desc: '团队最高荣誉' },
];

const timelineEvents = [
  { year: '2019', title: '团队成立', desc: '超算与并行计算团队正式成立', icon: Users, milestone: false },
  { year: '2019', title: 'CPC金奖', desc: '第四届"神威杯"国产CPU并行应用挑战赛金奖', icon: Trophy, milestone: true },
  { year: '2024', title: 'ASC国际一等奖', desc: 'ASC世界大学生超级计算机竞赛国际一等奖、最佳团队奖', icon: Trophy, milestone: true },
  { year: '2024', title: 'PAC全国一等奖', desc: 'PAC并行应用挑战赛全国一等奖', icon: Award, milestone: true },
  { year: '2025', title: '飞翔奖最佳团队', desc: '第九届飞翔奖"最佳团队奖"', icon: Trophy, milestone: true },
  { year: '2026', title: '持续突破', desc: '算力向上，是一场永不妥协的自我超越与静默进化。', icon: Award, milestone: false },
];

const awardsData = [
  { id: 'asc', name: 'ASC世界大学生超级计算机竞赛', icon: Trophy, awards: ['国际一等奖 1项', '国际二等奖 8项', '超级团队奖 1项'] },
  { id: 'cpc', name: 'CPC国产CPU并行应用挑战赛', icon: Medal, awards: ['金奖 1项', '二等奖 4项', '三等奖 1项'] },
  { id: 'ipcc', name: 'IPCC（ACM中国-国际并行计算挑战赛）', icon: Award, awards: ['教育基金奖 1项', '初赛二等奖 2项', '初赛三等奖 1项', '优胜奖 3项'] },
  { id: 'pac', name: 'PAC并行应用挑战赛', icon: Star, awards: ['全国一等奖 1项', '二等奖 2项'] },
  { id: 'tecorigin', name: 'Tecorigin算子开发任务挑战赛', icon: Medal, awards: ['二等奖 2项', '三等奖 6项', '优秀奖 5项', '贡献奖 2项'] },
];

const certificatesData = [
  { id: 1, category: 'ASC', year: '2024', title: 'ASC24 国际一等奖', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777207045493-ASC24_一等奖.jpg?auth_key=bb7243713f922a392ebd4e999b0b915a70152eed3d9fe700a6dabde2a2334bce' },
  { id: 2, category: 'ASC', year: '2024', title: 'ASC24 超级团队奖', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777207342139-杨嘉苓ASC国际超级团队奖.jpg?auth_key=6eac54323793a48676f7c541646a9d48c828f7edab4112119c33f295bfe3aa9b' },
  { id: 3, category: 'ASC', year: '2024', title: 'ASC24 国际二等奖', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777207045510-ASC24二等奖.jpg?auth_key=f22a6afee96bf830c9a92f64462af146e602c8d16d976ca6685367469fdc9b06' },
  { id: 4, category: 'ASC', year: '2025', title: 'ASC25 国际二等奖 (1)', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777207045452-ASC2025二等奖_1.jpeg?auth_key=9ab5031f13f519a2b251b7616f44ff05c210105f45fd8ef36c5a680073493ccf' },
  { id: 5, category: 'ASC', year: '2025', title: 'ASC25 国际二等奖 (2)', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777207045468-ASC2025二等奖_2.jpg?auth_key=dbed79659a811f899a086f14f7e6e2b3c6dc7df45aa5a24c6d13d608a759d27a' },
  { id: 6, category: 'ASC', year: '2025', title: 'ASC25 国际二等奖 (3)', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777207045478-ASC2025二等奖_3.png?auth_key=ad82da384ffb1eeeef2a32bfb1f887c3c5c6c02195035ef927af70dda55402ae' },
  { id: 7, category: 'ASC', year: '2021', title: 'ASC21 国际二等奖', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777207045446-ASC01.jpg?auth_key=ce17ddaefbe3a2c62b12f39366731b35fce609d57b0bfc99cf92f105f678495a' },
  { id: 8, category: 'ASC', year: '2024', title: 'ASC国际超级团队奖', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777208176532-杨嘉苓ASC国际超级团队奖_1__1_.jpg?auth_key=a3eba126e3be3f83b59090c9846c850d64ecfd45ace2eb099ac1e6fe7771bcc8' },
  { id: 9, category: 'CPC', year: '2020', title: 'CPC2020 金奖', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777207045560-CPC2020金奖.jpg?auth_key=d5b99d0981d3cc255639d409b09a725277d35d38b6785c744f8b8381f569fdc2' },
  { id: 10, category: 'CPC', year: '2022', title: 'CPC22 三等奖', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777207331910-Lambda.jpg?auth_key=9b1f11e24e5379515a9ff276cbe979bda61e81e54189d60bf271a7eb3ef4185c' },
  { id: 11, category: 'CPC', year: '2023', title: 'CPC23 参赛证明', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777207045567-CPC23_1.jpg?auth_key=34b61cb603bd1821b97bda042fc7f54b18e4e543add6398465f362907170b67b' },
  { id: 12, category: 'CPC', year: '2023', title: 'CPC23 全国二等奖', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777207045575-CPC23_2.jpg?auth_key=0de4eef9ebde74aca4b6d4d2219c194587caabdbc1d879551e60f627f0b24bf9' },
  { id: 13, category: 'CPC', year: '2023', title: 'CPC23 全国三等奖', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-05-03/1777810999946-CPC23_3.jpg?auth_key=bb6be1f8ee4c949ebd0dac1c72756d467e5c6e69d12086bce55cf8cbef363229' },
  { id: 14, category: 'CCF', year: '2025', title: 'CCF-TCARCH 2025 二等奖', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777207045553-CCF2025二等奖.jpg?auth_key=cd628c2632bc1d0c0387ec3aee11a2afb70ea2dbb84f2150b45eba2d174251ed' },
  { id: 15, category: 'MCC', year: '2024', title: 'MCC2024 海洋计算挑战', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777208143933-MCC2024_奖状.jpeg?auth_key=3a509f8938737ab1c1593d772a8fe1ea653564ed393afaa6547bce8874a804bc' },
  { id: 16, category: 'MCC', year: '2025', title: 'MCC2025 海浪奖三等奖', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-05-03/1777808994619-MCC2025三等奖.png?auth_key=5e8953b32e0f566572e547285c80c4edc78c4fec20fdd4b37c0e623f19599b15' },
  { id: 17, category: 'TECORIGIN', year: '2024', title: 'Tecorigin 二等奖 (1)', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777208155859-teco2024_01二等奖.png?auth_key=3de09d8ad9ccfa13be1ecfd73ce8c1b4383f43a25b776f09ac06c5865f39d7fb' },
  { id: 18, category: 'TECORIGIN', year: '2024', title: 'Tecorigin 二等奖 (2)', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-05-03/1777809175075-teco2024_07三等奖.png?auth_key=13ec26bcfc56cf146a3872c29cbc275ce7540a0f2d2d339fb34cc19e3937d9b5' },
  { id: 19, category: 'TECORIGIN', year: '2024', title: 'Tecorigin 三等奖 (1)', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777208155875-teco2024_01三等奖.png?auth_key=492abb6aeaa3a354a902dd0665bf8405b4ee485c9664c123204151cd41016ef2' },
  { id: 20, category: 'TECORIGIN', year: '2024', title: 'Tecorigin 三等奖 (2)', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-05-03/1777809192530-teco2024_05三等奖.png?auth_key=6b8abf56cf69c7fce1dca9067cb5356de62caa2f7b4a0cac5b3ff96f77940fad' },
  { id: 21, category: 'TECORIGIN', year: '2024', title: 'Tecorigin 三等奖 (3)', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-05-03/1777809198626-teco2024_03三等奖.png?auth_key=792c11b826d1c019c9609c448b222393d1314c151bb0668f30d915ec92d63f21' },
  { id: 22, category: 'TECORIGIN', year: '2024', title: 'Tecorigin 优秀奖 (1)', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-05-03/1777809168688-teco2024_03优秀奖.png?auth_key=2fa53f7f3a2ef7bba925a7ea69f91956dd96a3203753c933b00cba61d4f4d9ec' },
  { id: 23, category: 'TECORIGIN', year: '2024', title: 'Tecorigin 优秀奖 (2)', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-05-03/1777809204539-teco2024_01优秀奖.png?auth_key=1b4387b2c9475eb923532dbbddaf0faab55254469b49d179ebb4a70b3e968a77' },
  { id: 24, category: 'TECORIGIN', year: '2024', title: 'Tecorigin 优秀奖 (3)', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-05-03/1777809211753-teco2024_06优秀奖.png?auth_key=4a360b72d5aa9321607ae91107fe8e3ba94dfe5fdd716c9b273e18e83e894876' },
  { id: 25, category: 'TECORIGIN', year: '2024', title: 'Tecorigin 优秀奖 (4)', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-05-03/1777809218462-teco2024_04优秀奖.png?auth_key=edbff4ac0556451414e29adbf301a557bbe9cc277b878660d85f90d0b1ac4ab4' },
  { id: 26, category: 'IPCC', year: '2020', title: 'IPCC2020 优胜奖', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-05-03/1777811181330-IPCC2020-优胜奖__2_.jpg?auth_key=2b83e5b929ad3478b3b56d5ee1b41e4c64c15159f983639930f778db363dd785' },
  { id: 27, category: 'FLYING_AWARD', year: '2025', title: '第九届飞翔奖', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777208155926-第九届飞翔奖.jpg?auth_key=21d38a7ec3a582e96ee2efc5bf1aa6de82b5c9f62457a861a14ba36217d0ba7b' },
  { id: 28, category: 'FLYING_AWARD', year: '2022', title: '第七届飞翔奖提名奖', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777208155929-飞翔奖__2__1_.jpg?auth_key=3ebe2c7c7978cfd3f4da889916ba8699b0a25ac6bce2acf953a9a9bd63a8321b' },
  { id: 29, category: 'COMPUTER_DESIGN', year: '2024', title: '计算机设计大赛国一', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777208172270-计算机设计大赛国一_1_.jpg?auth_key=05016ed35582c1da6fcb671759652696847a04d3b41d6141566619bfec66ee43' },
  { id: 30, category: 'PIONEER_CUP', year: '2025', title: '先导杯2025 优胜奖 (1)', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777208176525-先导杯2025_优胜奖1_1_.png?auth_key=d092d60ffb629f48acca2a01ddbd2c2574c9050ace722ba75b5a57d2db9b8e7f' },
  { id: 31, category: 'PIONEER_CUP', year: '2025', title: '先导杯2025 优胜奖 (2)', image: 'https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-26/1777208176541-先导杯2025_优胜奖2.jpg?auth_key=3da1eda54be1d519e4558f88ca7415d1adc55f2134fdcb7f905c04a58e7e48fb' },
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
      <h2 className="text-display-sm text-[#1A2639] tracking-tight pr-16">{title}</h2>
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
  visible: { opacity: 1, y: 0 }
};

export default function TeamHistory() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === stats.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A2639]/5 border border-[#1A2639]/10 rounded-full mb-8">
              <div className="w-1.5 h-1.5 bg-[#3498DB] rounded-full animate-pulse" />
              <span className="text-xs text-[#4A5568] font-medium">团队历程</span>
            </div>

            <h1 className="text-display-lg md:text-display-xl tracking-tight">
              <span className="text-[#1A2639]">从3人到45人</span>
              <br />
              <span className="text-gradient-accent">奋斗之路</span>
            </h1>

            <p className="mt-6 text-body-lg text-[#4A5568] leading-relaxed max-w-2xl">
              累计获奖60余次，持续前行中
            </p>
          </motion.div>
        </div>
      </section>

      <section ref={statsRef} className="py-12 bg-[#F4F6F9]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative max-w-lg mx-auto">
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="w-full flex-shrink-0 px-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <stat.icon className="w-8 h-8 text-[#3498DB]" />
                      </div>
                      <div className="text-display-md text-[#1A2639] mb-2 stat-number font-bold">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={statsInView} />
                      </div>
                      <div className="text-base font-medium text-[#1A2639] mb-1">{stat.label}</div>
                      <div className="text-sm text-[#718096]">{stat.desc}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {stats.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentIndex ? 'w-6 bg-[#3498DB]' : 'w-1.5 bg-[#1A2639]/20 hover:bg-[#1A2639]/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle title="成长时间线" subtitle="每一个里程碑，都是团队前进的见证" />
          
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#1A2639]/5 via-[#3498DB]/30 to-[#1A2639]/5 md:-translate-x-1/2" />
            
            {timelineEvents.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex items-center mb-10 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`hidden md:block w-1/2 ${idx % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="group p-5 card-glass bg-[#F4F6F9] rounded-xl border border-[#1A2639]/5 hover:border-[#3498DB]/30 transition-all">
                    <div className="flex items-center gap-2 mb-2 justify-start">
                      <event.icon className="w-4 h-4 text-[#3498DB]" />
                      <span className="text-xs font-mono text-[#3498DB]">{event.year}</span>
                      {event.milestone && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-[#F59E0B]/10 text-[#F59E0B] rounded">里程碑</span>
                      )}
                    </div>
                    <h3 className="text-sm font-medium text-[#1A2639] mb-1">{event.title}</h3>
                    <p className="text-xs text-[#718096]">{event.desc}</p>
                  </div>
                </div>
                
                <div className="absolute left-4 md:left-1/2 w-2 h-2 bg-[#1A2639]/20 rounded-full md:-translate-x-1/2">
                  {event.milestone && (
                    <div className="absolute inset-0 bg-[#3498DB] rounded-full animate-ping" />
                  )}
                </div>
                
                <div className="md:hidden ml-10 flex-1">
                  <div className="group p-5 card-glass bg-[#F4F6F9] rounded-xl border border-[#1A2639]/5 hover:border-[#3498DB]/30 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <event.icon className="w-4 h-4 text-[#3498DB]" />
                      <span className="text-xs font-mono text-[#3498DB]">{event.year}</span>
                      {event.milestone && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-[#F59E0B]/10 text-[#F59E0B] rounded">里程碑</span>
                      )}
                    </div>
                    <h3 className="text-sm font-medium text-[#1A2639] mb-1">{event.title}</h3>
                    <p className="text-xs text-[#718096]">{event.desc}</p>
                  </div>
                </div>
                
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F4F6F9]">
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle title="竞赛成果" subtitle="在国内外顶级超算赛事中屡创佳绩" />
          
          <motion.div 
            className="grid md:grid-cols-2 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {awardsData.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="card-glass group p-6 bg-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#1A2639]/5 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#3498DB]" />
                  </div>
                  <h3 className="text-sm font-medium text-[#1A2639]">{item.name}</h3>
                </div>
                <div className="space-y-2">
                  {item.awards.map((award, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[#718096] text-sm">
                      <div className="w-1 h-1 bg-[#3498DB] rounded-full" />
                      <span>{award}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-heading-lg text-[#1A2639] mb-6 relative">
              获奖证书展示
              <div className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-[#1A2639] to-[#3498DB] rounded-full" />
            </h3>
          </motion.div>
          
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certificatesData.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="card-glass bg-white rounded-xl overflow-hidden group cursor-pointer"
                whileHover={{ y: -4 }}
              >
                <div className="aspect-[3/4] overflow-hidden bg-[#F4F6F9]">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-medium text-[#1A2639] truncate">{cert.title}</h4>
                  <p className="text-xs text-[#3498DB] mt-0.5">{cert.year}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden shadow-elevated card-glass">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12 bg-[#F4F6F9]">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F59E0B]/10 rounded mb-6">
                  <Trophy className="w-4 h-4 text-[#F59E0B]" />
                  <span className="text-xs font-medium text-[#F59E0B]">荣誉时刻</span>
                </div>
                <h3 className="text-heading-xl text-[#1A2639] mb-4">第九届飞翔奖"最佳团队奖"</h3>
                <p className="text-[#4A5568] leading-relaxed mb-6 text-body-md">
                  以持续的凝聚力与战斗力赢得肯定，团队成员在颁奖典礼上合影留念。
                </p>
                <div className="flex items-center gap-4 text-xs text-[#718096]">
                  <span>• 团队荣誉</span>
                  <span>• 2025年度</span>
                </div>
              </div>
              <div className="relative min-h-[300px]">
                <img
                  src="https://conversation.cdn.meoo.host/conversations/305887077998919680/image/2026-04-24/1777003008119-f0961b652a2039805208bbbc4e75aa64.jpg?auth_key=0de4ff3bfaa972c24bdf6e292a3efc5462f0b370b86d8e536abfaf20b37925ef"
                  alt="第九届飞翔奖最佳团队奖颁奖现场"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}