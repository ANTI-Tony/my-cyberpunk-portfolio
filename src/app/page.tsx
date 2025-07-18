'use client';

import React, { useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Calendar, MapPin, Code, Briefcase, GraduationCap, User, Menu, X, ChevronRight, Terminal, Zap, Globe, Database, Server, Languages } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('zh'); // 'zh' for Chinese, 'en' for English

  const navigateTo = (page: string) => {
    if (page === currentPage) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsMenuOpen(false);
      setIsLoading(false);
    }, 300);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  // 多语言文本数据
  const texts = {
    zh: {
      // 导航
      nav: {
        home: '首页',
        about: '关于',
        experience: '经历', 
        projects: '项目',
        contact: '联系'
      },
      // 个人信息
      personal: {
        name: "Jingbo(Tony) Wen",
        title: "全栈开发工程师",
        subtitle: "代码 // 创造 // 创新",
        email: "ts2015656@gmail.com",
        location: "悉尼",
        description: "我是一个热衷于构建未来的开发者，专注于前沿技术和创新解决方案。在代码的世界里创造无限可能。"
      },
      // 首页
      home: {
        hello: "你好，我是",
        viewProjects: "查看项目",
        contactMe: "联系我"
      },
      // 关于页面
      about: {
        title: "关于",
        me: "我",
        personalIntro: "个人简介",
        basicInfo: "基本信息",
        techStack: "技术栈",
        location: "位置:",
        status: "状态:",
        specialty: "专长:",
        openToWork: "开放工作机会",
        fullstackDev: "全栈开发 & 系统设计",
        intro1: "我是一名全栈开发工程师，热衷于探索技术的边界。从前端的用户体验到后端的系统架构，我致力于创造既美观又实用的数字解决方案。",
        intro2: "在代码的世界里，我不断学习新的技术栈，追求代码的艺术性和效率。我相信技术能够改变世界，而我们是这个变化的推动者。"
      },
      // 经历页面
      experience: {
        title: "我的",
        experience: "经历",
        skills: "技能标签",
        achievements: "主要成就",
        experiences: [
          {
            title: '高级全栈工程师',
            company: 'TechCorp Inc.',
            period: '2022 - 至今',
            description: '负责核心产品的架构设计与开发，带领团队完成多个重要项目，提升系统性能50%。',
            skills: ['React', 'Node.js', 'AWS', 'TypeScript', 'MongoDB'],
            achievements: ['领导5人开发团队', '优化系统性能50%', '设计微服务架构']
          },
          {
            title: '前端工程师',
            company: 'StartupXYZ',
            period: '2020 - 2022',
            description: '从零开始构建公司产品的前端系统，建立开发规范和CI/CD流程。',
            skills: ['Vue.js', 'JavaScript', 'Webpack', 'Jest'],
            achievements: ['搭建前端基础架构', '建立代码规范', '实现自动化部署']
          },
          {
            title: '计算机科学学士',
            company: '某某大学',
            period: '2016 - 2020',
            description: '专业成绩优异，参与多个开源项目，获得校级编程竞赛一等奖。',
            skills: ['算法与数据结构', 'Java', 'Python', '机器学习'],
            achievements: ['GPA 3.8/4.0', '编程竞赛一等奖', '开源贡献者']
          }
        ]
      },
      // 项目页面
      projects: {
        title: "我的",
        projects: "项目",
        subtitle: "探索我创建的一些项目，从AI应用到区块链解决方案，每个项目都是技术创新的体现。",
        techStack: "技术栈",
        code: "代码",
        demo: "演示",
        completed: "已完成",
        inProgress: "进行中",
        concept: "概念阶段",
        projectList: [
          {
            title: 'AI驱动的任务管理系统',
            description: '基于机器学习的智能任务分配和优先级排序系统，提高团队效率40%。使用先进的NLP技术理解任务描述，自动分类和优先级评估。',
            tech: ['React', 'Python', 'TensorFlow', 'MongoDB', 'AWS'],
            status: 'completed'
          },
          {
            title: '区块链投票系统', 
            description: '去中心化的透明投票平台，确保选举过程的公正性和不可篡改性。采用零知识证明保护选民隐私，同时保证投票结果的可验证性。',
            tech: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'IPFS'],
            status: 'completed'
          },
          {
            title: '实时协作代码编辑器',
            description: '支持多人实时协作的在线代码编辑器，集成语法高亮、代码补全、实时预览等功能。支持多种编程语言和主题。',
            tech: ['Next.js', 'Socket.io', 'Monaco Editor', 'Node.js', 'Redis'],
            status: 'in-progress'
          },
          {
            title: '量子加密通信平台',
            description: '基于量子密钥分发的安全通信平台，为企业提供最高级别的数据保护。利用量子纠缠特性实现理论上不可破解的加密通信。',
            tech: ['Python', 'Quantum Computing', 'Cryptography', 'FastAPI'],
            status: 'concept'
          }
        ]
      },
      // 联系页面
      contact: {
        title: "联系",
        me: "我",
        subtitle: "有项目合作想法？或者只是想聊聊技术？我很乐意与您交流！",
        contactMethods: "联系方式",
        currentStatus: "当前状态",
        cooperationMethods: "合作方式",
        email: "邮箱",
        github: "GitHub",
        linkedin: "LinkedIn",
        viewMyCode: "查看我的代码",
        professionalProfile: "专业履历",
        openToOpportunities: "开放新的工作机会",
        remoteWork: "可接受远程合作",
        techCommunication: "乐于技术交流",
        projectCooperation: "项目合作",
        projectCoopDesc: "全栈开发、系统架构设计、技术咨询等项目合作。",
        techExchange: "技术交流",
        techExchangeDesc: "开源项目讨论、技术分享、代码审查等技术交流活动。",
        careerOpportunities: "职业机会",
        careerOpportunitiesDesc: "全职工作、远程工作、创业合伙等职业发展机会。",
        contactNow: "立即联系",
        tags: {
          remoteWork: "远程协作",
          longTerm: "长期合作", 
          consulting: "技术指导",
          openSource: "开源贡献",
          sharing: "技术分享",
          codeReview: "代码审查",
          fullTime: "全职机会",
          remote: "远程工作",
          startup: "创业合伙"
        }
      }
    },
    en: {
      // Navigation
      nav: {
        home: 'Home',
        about: 'About',
        experience: 'Experience',
        projects: 'Projects', 
        contact: 'Contact'
      },
      // Personal Info
      personal: {
        name: "Neo Anderson",
        title: "Full Stack Developer",
        subtitle: "Code // Create // Innovate",
        email: "neo@matrix.com",
        location: "Digital World • Matrix City",
        description: "I am a developer passionate about building the future, focusing on cutting-edge technologies and innovative solutions. Creating unlimited possibilities in the world of code."
      },
      // Home Page
      home: {
        hello: "Hello, I'm",
        viewProjects: "View Projects",
        contactMe: "Contact Me"
      },
      // About Page
      about: {
        title: "About",
        me: "Me",
        personalIntro: "Personal Introduction",
        basicInfo: "Basic Information",
        techStack: "Tech Stack",
        location: "Location:",
        status: "Status:",
        specialty: "Specialty:",
        openToWork: "Open to work opportunities",
        fullstackDev: "Full Stack Development & System Design",
        intro1: "I am a full-stack developer passionate about exploring the boundaries of technology. From frontend user experience to backend system architecture, I am committed to creating digital solutions that are both beautiful and practical.",
        intro2: "In the world of code, I continuously learn new technology stacks, pursuing the artistry and efficiency of code. I believe technology can change the world, and we are the drivers of this change."
      },
      // Experience Page
      experience: {
        title: "My",
        experience: "Experience",
        skills: "Skills",
        achievements: "Key Achievements",
        experiences: [
          {
            title: 'Senior Full Stack Engineer',
            company: 'TechCorp Inc.',
            period: '2022 - Present',
            description: 'Responsible for core product architecture design and development, leading the team to complete multiple important projects, improving system performance by 50%.',
            skills: ['React', 'Node.js', 'AWS', 'TypeScript', 'MongoDB'],
            achievements: ['Led a 5-person development team', 'Optimized system performance by 50%', 'Designed microservices architecture']
          },
          {
            title: 'Frontend Engineer',
            company: 'StartupXYZ',
            period: '2020 - 2022',
            description: 'Built the company\'s frontend system from scratch, established development standards and CI/CD processes.',
            skills: ['Vue.js', 'JavaScript', 'Webpack', 'Jest'],
            achievements: ['Built frontend infrastructure', 'Established code standards', 'Implemented automated deployment']
          },
          {
            title: 'Bachelor of Computer Science',
            company: 'University ABC',
            period: '2016 - 2020',
            description: 'Excellent academic performance, participated in multiple open source projects, won first prize in university programming competition.',
            skills: ['Data Structures & Algorithms', 'Java', 'Python', 'Machine Learning'],
            achievements: ['GPA 3.8/4.0', 'Programming Competition First Prize', 'Open Source Contributor']
          }
        ]
      },
      // Projects Page
      projects: {
        title: "My",
        projects: "Projects",
        subtitle: "Explore some of my projects, from AI applications to blockchain solutions, each project represents technological innovation.",
        techStack: "Tech Stack",
        code: "Code",
        demo: "Demo", 
        completed: "Completed",
        inProgress: "In Progress",
        concept: "Concept",
        projectList: [
          {
            title: 'AI-Driven Task Management System',
            description: 'Intelligent task allocation and priority sorting system based on machine learning, improving team efficiency by 40%. Uses advanced NLP technology to understand task descriptions and automatically classify and evaluate priorities.',
            tech: ['React', 'Python', 'TensorFlow', 'MongoDB', 'AWS'],
            status: 'completed'
          },
          {
            title: 'Blockchain Voting System',
            description: 'Decentralized transparent voting platform ensuring fairness and immutability of the election process. Uses zero-knowledge proofs to protect voter privacy while ensuring verifiable voting results.',
            tech: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'IPFS'],
            status: 'completed'
          },
          {
            title: 'Real-time Collaborative Code Editor',
            description: 'Online code editor supporting multi-user real-time collaboration, integrating syntax highlighting, code completion, real-time preview and other features. Supports multiple programming languages and themes.',
            tech: ['Next.js', 'Socket.io', 'Monaco Editor', 'Node.js', 'Redis'],
            status: 'in-progress'
          },
          {
            title: 'Quantum Encryption Communication Platform',
            description: 'Secure communication platform based on quantum key distribution, providing the highest level of data protection for enterprises. Uses quantum entanglement properties to achieve theoretically unbreakable encrypted communication.',
            tech: ['Python', 'Quantum Computing', 'Cryptography', 'FastAPI'],
            status: 'concept'
          }
        ]
      },
      // Contact Page
      contact: {
        title: "Contact",
        me: "Me",
        subtitle: "Have a project collaboration idea? Or just want to chat about technology? I'd love to communicate with you!",
        contactMethods: "Contact Methods",
        currentStatus: "Current Status",
        cooperationMethods: "Cooperation Methods",
        email: "Email",
        github: "GitHub",
        linkedin: "LinkedIn",
        viewMyCode: "View my code",
        professionalProfile: "Professional profile",
        openToOpportunities: "Open to new work opportunities",
        remoteWork: "Available for remote collaboration",
        techCommunication: "Enjoy technical communication",
        projectCooperation: "Project Cooperation",
        projectCoopDesc: "Full-stack development, system architecture design, technical consulting and other project collaborations.",
        techExchange: "Technical Exchange",
        techExchangeDesc: "Open source project discussions, technical sharing, code reviews and other technical exchange activities.",
        careerOpportunities: "Career Opportunities", 
        careerOpportunitiesDesc: "Full-time work, remote work, startup partnerships and other career development opportunities.",
        contactNow: "Contact Now",
        tags: {
          remoteWork: "Remote Work",
          longTerm: "Long-term Cooperation",
          consulting: "Technical Consulting",
          openSource: "Open Source",
          sharing: "Tech Sharing",
          codeReview: "Code Review",
          fullTime: "Full-time",
          remote: "Remote",
          startup: "Startup Partnership"
        }
      }
    }
  };

  const t = texts[language];

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Terminal },
    { id: 'about', label: t.nav.about, icon: User },
    { id: 'experience', label: t.nav.experience, icon: Briefcase },
    { id: 'projects', label: t.nav.projects, icon: Code },
    { id: 'contact', label: t.nav.contact, icon: Mail }
  ];

  // 内联样式确保科幻效果
  const styles = {
    neonText: {
      background: 'linear-gradient(45deg, #00f5ff, #ff00ff, #00f5ff)',
      backgroundSize: '200% 200%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'neonPulse 3s ease-in-out infinite',
    },
    glowingAvatar: {
      background: 'linear-gradient(45deg, #00f5ff, #ff00ff)',
      padding: '4px',
      borderRadius: '50%',
      boxShadow: '0 0 30px rgba(0, 245, 255, 0.5), 0 0 60px rgba(255, 0, 255, 0.3)',
      animation: 'avatarGlow 2s ease-in-out infinite alternate',
    },
    neonButton: {
      background: 'linear-gradient(45deg, #00f5ff, #ff00ff)',
      border: 'none',
      borderRadius: '12px',
      padding: '16px 32px',
      color: '#000',
      fontWeight: '600',
      fontSize: '16px',
      cursor: 'pointer',
      boxShadow: '0 0 25px rgba(0, 245, 255, 0.5)',
      transition: 'all 0.3s ease',
    },
    outlineButton: {
      padding: '16px 32px',
      border: '2px solid #00f5ff',
      background: 'transparent',
      color: '#00f5ff',
      borderRadius: '12px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '16px',
      transition: 'all 0.3s ease'
    },
    glassCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(0, 245, 255, 0.2)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    },
    floatingOrbs: {
      position: 'absolute' as const,
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      filter: 'blur(60px)',
      opacity: 0.3,
      animation: 'float 6s ease-in-out infinite',
    },
    langButton: {
      padding: '8px 16px',
      border: '1px solid rgba(0, 245, 255, 0.3)',
      background: 'rgba(0, 245, 255, 0.1)',
      color: '#00f5ff',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  };

  const Navigation = () => (
    <>
      <style jsx>{`
        @keyframes neonPulse {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes avatarGlow {
          0% { box-shadow: 0 0 20px rgba(0, 245, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3); }
          100% { box-shadow: 0 0 40px rgba(0, 245, 255, 0.8), 0 0 80px rgba(255, 0, 255, 0.5); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
      `}</style>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 245, 255, 0.3)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(45deg, #00f5ff, #ff00ff)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Terminal size={18} color="#000" />
              </div>
              <span style={{
                fontSize: '20px',
                fontWeight: 'bold',
                ...styles.neonText
              }}>
                {t.personal.name}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* 导航按钮 */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => navigateTo(item.id)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        background: isActive ? 'rgba(0, 245, 255, 0.2)' : 'transparent',
                        color: isActive ? '#00f5ff' : '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        transition: 'all 0.3s ease',
                        boxShadow: isActive ? '0 0 20px rgba(0, 245, 255, 0.3)' : 'none'
                      }}
                      onMouseOver={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(0, 245, 255, 0.1)';
                          e.currentTarget.style.color = '#00f5ff';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#fff';
                        }
                      }}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 语言切换按钮 */}
              <button
                onClick={toggleLanguage}
                style={styles.langButton}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 245, 255, 0.2)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 245, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Languages size={16} />
                <span>{language === 'zh' ? 'EN' : '中'}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );

  const LoadingScreen = () => (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#000',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: '12px',
              height: '12px',
              background: '#00f5ff',
              borderRadius: '50%',
              animation: `pulse 1.5s ease-in-out infinite ${i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );

  const HomePage = () => (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a0a1a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 浮动装饰元素 */}
      <div style={{
        ...styles.floatingOrbs,
        background: 'radial-gradient(circle, rgba(0, 245, 255, 0.4) 0%, transparent 70%)',
        top: '20%',
        left: '10%',
        animationDelay: '0s'
      }} />
      <div style={{
        ...styles.floatingOrbs,
        background: 'radial-gradient(circle, rgba(255, 0, 255, 0.4) 0%, transparent 70%)',
        bottom: '20%',
        right: '10%',
        animationDelay: '2s'
      }} />

      <div style={{
        position: 'relative',
        zIndex: 10,
        paddingTop: '96px',
        paddingBottom: '64px',
        padding: '96px 16px 64px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          {/* 头像区域 */}
          <div style={{ marginBottom: '32px', position: 'relative' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={styles.glowingAvatar}>
                <img
                  src="/images/tony.jpg"
                  alt="Profile"
                  style={{
                    width: '128px',
                    height: '128px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>
          </div>

          {/* 主标题 */}
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            marginBottom: '16px',
            lineHeight: '1.1'
          }}>
            <span style={{ color: '#fff' }}>{t.home.hello} </span>
            <span style={styles.neonText}>
              {t.personal.name}
            </span>
          </h1>

          <p style={{
            fontSize: '1.5rem',
            color: '#ccc',
            marginBottom: '16px',
            fontFamily: 'monospace'
          }}>
            {t.personal.subtitle}
          </p>

          <p style={{
            fontSize: '1.1rem',
            color: '#999',
            maxWidth: '600px',
            margin: '0 auto 32px',
            lineHeight: '1.6'
          }}>
            {t.personal.description}
          </p>

          {/* 技能标签云 */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '48px'
          }}>
            {['React', 'TypeScript', 'Node.js', 'Python', 'AI/ML', 'Blockchain'].map((skill, index) => (
              <span
                key={skill}
                style={{
                  padding: '10px 20px',
                  background: 'rgba(0, 245, 255, 0.1)',
                  border: '1px solid rgba(0, 245, 255, 0.3)',
                  borderRadius: '25px',
                  color: '#00f5ff',
                  fontFamily: 'monospace',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 245, 255, 0.2)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 245, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* CTA按钮 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <button
              onClick={() => navigateTo('projects')}
              style={{
                ...styles.neonButton,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 245, 255, 0.8)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 245, 255, 0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>{t.home.viewProjects}</span>
              <ChevronRight size={20} />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              style={styles.outlineButton}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(0, 245, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 245, 255, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {t.home.contactMe}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a0a1a 100%)',
      paddingTop: '96px',
      paddingBottom: '64px',
      padding: '96px 16px 64px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>
            {t.about.title} <span style={{ color: '#00f5ff' }}>{t.about.me}</span>
          </h1>
          <div style={{
            width: '96px',
            height: '4px',
            background: 'linear-gradient(45deg, #00f5ff, #ff00ff)',
            margin: '0 auto'
          }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '48px',
          alignItems: 'start'
        }}>
          {/* 左侧：个人简介和基本信息 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* 个人简介卡片 */}
            <div style={{
              ...styles.glassCard,
              padding: '32px',
              borderColor: 'rgba(0, 245, 255, 0.2)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <User color="#00f5ff" size={24} />
                {t.about.personalIntro}
              </h2>
              <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '16px' }}>
                {t.about.intro1}
              </p>
              <p style={{ color: '#ccc', lineHeight: '1.6' }}>
                {t.about.intro2}
              </p>
            </div>

            {/* 基本信息卡片 */}
            <div style={{
              ...styles.glassCard,
              padding: '32px',
              borderColor: 'rgba(255, 0, 255, 0.2)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <MapPin color="#ff00ff" size={24} />
                {t.about.basicInfo}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#00f5ff', fontFamily: 'monospace', marginRight: '12px', width: '80px' }}>{t.about.location}</span>
                  <span style={{ color: '#ccc' }}>{t.personal.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#00f5ff', fontFamily: 'monospace', marginRight: '12px', width: '80px' }}>{t.about.status}</span>
                  <span style={{ display: 'flex', alignItems: 'center', color: '#ccc' }}>
                    <div style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%', marginRight: '8px', animation: 'pulse 2s infinite' }} />
                    {t.about.openToWork}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#00f5ff', fontFamily: 'monospace', marginRight: '12px', width: '80px' }}>{t.about.specialty}</span>
                  <span style={{ color: '#ccc' }}>{t.about.fullstackDev}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：技能矩阵 */}
          <div style={{
            ...styles.glassCard,
            padding: '32px'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Code color="#00f5ff" size={24} />
              {t.about.techStack}
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                { category: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'], icon: Globe },
                { category: 'Backend', skills: ['Node.js', 'Python', 'Express', 'FastAPI'], icon: Server },
                { category: 'Database', skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Supabase'], icon: Database },
                { category: 'Tools', skills: ['Git', 'Docker', 'AWS', 'Vercel'], icon: Zap }
              ].map((group) => {
                const Icon = group.icon;
                return (
                  <div key={group.category}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px'
                    }}>
                      <Icon size={18} color="#ff00ff" />
                      {group.category}
                    </h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '8px'
                    }}>
                      {group.skills.map((skill) => (
                        <div
                          key={skill}
                          style={{
                            padding: '12px 16px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            color: '#ccc',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.5)';
                            e.currentTarget.style.color = '#00f5ff';
                            e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 245, 255, 0.2)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.color = '#ccc';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ExperiencePage = () => {
    const experiences = t.experience.experiences;

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a0a1a 100%)',
        paddingTop: '96px',
        paddingBottom: '64px',
        padding: '96px 16px 64px'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>
              {t.experience.title} <span style={{ color: '#00f5ff' }}>{t.experience.experience}</span>
            </h1>
            <div style={{
              width: '96px',
              height: '4px',
              background: 'linear-gradient(45deg, #00f5ff, #ff00ff)',
              margin: '0 auto'
            }} />
          </div>

          <div style={{ position: 'relative' }}>
            {/* 时间线 */}
            <div style={{
              position: 'absolute',
              left: '32px',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, #00f5ff, #ff00ff, #00f5ff)'
            }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {experiences.map((exp, index) => (
                <div key={index} style={{ position: 'relative', display: 'flex', alignItems: 'flex-start' }}>
                  {/* 时间线节点 */}
                  <div style={{
                    flexShrink: 0,
                    width: '64px',
                    height: '64px',
                    background: '#000',
                    border: '4px solid #00f5ff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 10,
                    boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)'
                  }}>
                    {exp.company.includes('大学') || exp.company.includes('University') ? (
                      <GraduationCap size={28} color="#00f5ff" />
                    ) : (
                      <Briefcase size={28} color="#00f5ff" />
                    )}
                  </div>
                  
                  {/* 内容卡片 */}
                  <div style={{ marginLeft: '32px', flex: 1 }}>
                    <div style={{
                      ...styles.glassCard,
                      padding: '32px',
                      borderColor: 'rgba(0, 245, 255, 0.2)'
                    }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                        marginBottom: '16px'
                      }}>
                        <div>
                          <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>
                            {exp.title}
                          </h3>
                          <p style={{ fontSize: '1.2rem', color: '#00f5ff', fontWeight: '600' }}>
                            {exp.company}
                          </p>
                        </div>
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '8px 16px',
                          background: 'rgba(255, 0, 255, 0.2)',
                          color: '#ff00ff',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: '500',
                          gap: '8px',
                          width: 'fit-content'
                        }}>
                          <Calendar size={16} />
                          {exp.period}
                        </div>
                      </div>
                      
                      <p style={{ color: '#ccc', marginBottom: '24px', lineHeight: '1.6' }}>
                        {exp.description}
                      </p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                          <h4 style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#999',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: '12px'
                          }}>
                            {t.experience.skills}
                          </h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {exp.skills.map((skill) => (
                              <span
                                key={skill}
                                style={{
                                  padding: '6px 12px',
                                  background: 'rgba(0, 245, 255, 0.2)',
                                  color: '#00f5ff',
                                  borderRadius: '12px',
                                  fontSize: '14px',
                                  fontWeight: '500',
                                  border: '1px solid rgba(0, 245, 255, 0.3)'
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#999',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: '12px'
                          }}>
                            {t.experience.achievements}
                          </h4>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {exp.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: '#ccc'
                              }}>
                                <ChevronRight size={16} color="#ff00ff" style={{ marginRight: '8px', flexShrink: 0 }} />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProjectsPage = () => {
    const projects = t.projects.projectList;
    const projectImages = [
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=300&fit=crop',
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=300&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=300&fit=crop'
    ];

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a0a1a 100%)',
        paddingTop: '96px',
        paddingBottom: '64px',
        padding: '96px 16px 64px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>
              {t.projects.title} <span style={{ color: '#00f5ff' }}>{t.projects.projects}</span>
            </h1>
            <div style={{
              width: '96px',
              height: '4px',
              background: 'linear-gradient(45deg, #00f5ff, #ff00ff)',
              margin: '0 auto 32px'
            }} />
            <p style={{ color: '#999', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              {t.projects.subtitle}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
            gap: '32px'
          }}>
            {projects.map((project, index) => (
              <div
                key={index}
                style={{
                  ...styles.glassCard,
                  overflow: 'hidden',
                  transition: 'all 0.5s ease',
                  cursor: 'pointer',
                  borderColor: 'rgba(0, 245, 255, 0.2)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.5)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 245, 255, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.2)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
                }}
              >
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={projectImages[index]}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    display: 'flex',
                    gap: '8px'
                  }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      ...(project.status === 'completed' ? {
                        background: 'rgba(34, 197, 94, 0.2)',
                        color: '#4ade80',
                        border: '1px solid rgba(34, 197, 94, 0.3)'
                      } : project.status === 'in-progress' ? {
                        background: 'rgba(251, 191, 36, 0.2)',
                        color: '#fbbf24',
                        border: '1px solid rgba(251, 191, 36, 0.3)'
                      } : {
                        background: 'rgba(168, 85, 247, 0.2)',
                        color: '#a855f7',
                        border: '1px solid rgba(168, 85, 247, 0.3)'
                      })
                    }}>
                      {project.status === 'completed' ? t.projects.completed : 
                       project.status === 'in-progress' ? t.projects.inProgress : t.projects.concept}
                    </span>
                    <span style={{
                      padding: '4px 12px',
                      background: 'rgba(0, 0, 0, 0.8)',
                      color: '#ccc',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      2024
                    </span>
                  </div>
                </div>
                
                <div style={{ padding: '32px' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#fff',
                    marginBottom: '12px',
                    transition: 'color 0.3s ease'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{ color: '#ccc', marginBottom: '24px', lineHeight: '1.6' }}>
                    {project.description}
                  </p>
                  
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#999',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '12px'
                    }}>
                      {t.projects.techStack}
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            padding: '6px 12px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#ccc',
                            borderRadius: '8px',
                            fontSize: '14px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button
                      onClick={() => window.open('https://github.com/yourusername', '_blank')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: '#ccc',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      }}
                    >
                      <Github size={18} />
                      <span>{t.projects.code}</span>
                    </button>
                    {project.status !== 'concept' && (
                      <button
                        onClick={() => window.open('https://demo-site.com', '_blank')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '12px 20px',
                          background: 'linear-gradient(45deg, #00f5ff, #ff00ff)',
                          color: '#000',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.5)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <ExternalLink size={18} />
                        <span>{t.projects.demo}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ContactPage = () => (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a0a1a 100%)',
      paddingTop: '96px',
      paddingBottom: '64px',
      padding: '96px 16px 64px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>
            {t.contact.title} <span style={{ color: '#00f5ff' }}>{t.contact.me}</span>
          </h1>
          <div style={{
            width: '96px',
            height: '4px',
            background: 'linear-gradient(45deg, #00f5ff, #ff00ff)',
            margin: '0 auto 32px'
          }} />
          <p style={{ color: '#999', fontSize: '1.1rem' }}>
            {t.contact.subtitle}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '48px'
        }}>
          {/* 左侧：联系信息 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{
              ...styles.glassCard,
              padding: '32px',
              borderColor: 'rgba(0, 245, 255, 0.2)'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '24px' }}>
                {t.contact.contactMethods}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <button
                  onClick={() => window.open(`mailto:${t.personal.email}`, '_blank')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(45deg, #00f5ff, #ff00ff)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Mail size={24} color="#000" />
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontWeight: '500', marginBottom: '4px' }}>{t.contact.email}</p>
                    <p style={{ color: '#00f5ff', fontSize: '14px' }}>{t.personal.email}</p>
                  </div>
                </button>
                
                <button
                  onClick={() => window.open(t.personal.github, '_blank')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(45deg, #4a5568, #2d3748)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Github size={24} color="#fff" />
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontWeight: '500', marginBottom: '4px' }}>{t.contact.github}</p>
                    <p style={{ color: '#00f5ff', fontSize: '14px' }}>{t.contact.viewMyCode}</p>
                  </div>
                </button>
                
                <button
                  onClick={() => window.open(t.personal.linkedin, '_blank')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(45deg, #2563eb, #1d4ed8)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Linkedin size={24} color="#fff" />
                  </div>
                  <div>
                    <p style={{ color: '#fff', fontWeight: '500', marginBottom: '4px' }}>{t.contact.linkedin}</p>
                    <p style={{ color: '#00f5ff', fontSize: '14px' }}>{t.contact.professionalProfile}</p>
                  </div>
                </button>
              </div>
            </div>
            
            <div style={{
              ...styles.glassCard,
              padding: '32px',
              borderColor: 'rgba(255, 0, 255, 0.2)'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '24px' }}>
                {t.contact.currentStatus}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    background: '#4ade80',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                  }} />
                  <span style={{ color: '#ccc' }}>{t.contact.openToOpportunities}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    background: '#3b82f6',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                  }} />
                  <span style={{ color: '#ccc' }}>{t.contact.remoteWork}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    background: '#a855f7',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                  }} />
                  <span style={{ color: '#ccc' }}>{t.contact.techCommunication}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：合作方式 */}
          <div style={{
            ...styles.glassCard,
            padding: '32px'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', marginBottom: '24px' }}>
              {t.contact.cooperationMethods}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{
                padding: '24px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#00f5ff', marginBottom: '12px' }}>
                  {t.contact.projectCooperation}
                </h3>
                <p style={{ color: '#ccc', marginBottom: '16px', lineHeight: '1.6' }}>
                  {t.contact.projectCoopDesc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[t.contact.tags.remoteWork, t.contact.tags.longTerm, t.contact.tags.consulting].map((tag) => (
                    <span key={tag} style={{
                      padding: '4px 12px',
                      background: 'rgba(0, 245, 255, 0.2)',
                      color: '#00f5ff',
                      borderRadius: '12px',
                      fontSize: '14px'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div style={{
                padding: '24px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#ff00ff', marginBottom: '12px' }}>
                  {t.contact.techExchange}
                </h3>
                <p style={{ color: '#ccc', marginBottom: '16px', lineHeight: '1.6' }}>
                  {t.contact.techExchangeDesc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[t.contact.tags.openSource, t.contact.tags.sharing, t.contact.tags.codeReview].map((tag) => (
                    <span key={tag} style={{
                      padding: '4px 12px',
                      background: 'rgba(255, 0, 255, 0.2)',
                      color: '#ff00ff',
                      borderRadius: '12px',
                      fontSize: '14px'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div style={{
                padding: '24px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#4ade80', marginBottom: '12px' }}>
                  {t.contact.careerOpportunities}
                </h3>
                <p style={{ color: '#ccc', marginBottom: '16px', lineHeight: '1.6' }}>
                  {t.contact.careerOpportunitiesDesc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {[t.contact.tags.fullTime, t.contact.tags.remote, t.contact.tags.startup].map((tag) => (
                    <span key={tag} style={{
                      padding: '4px 12px',
                      background: 'rgba(74, 222, 128, 0.2)',
                      color: '#4ade80',
                      borderRadius: '12px',
                      fontSize: '14px'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div style={{ textAlign: 'center', paddingTop: '16px' }}>
                <button
                  onClick={() => window.open(`mailto:${t.personal.email}`, '_blank')}
                  style={{
                    ...styles.neonButton,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 245, 255, 0.8)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 245, 255, 0.5)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Mail size={20} />
                  <span>{t.contact.contactNow}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'about': return <AboutPage />;
      case 'experience': return <ExperiencePage />;
      case 'projects': return <ProjectsPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff' }}>
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #000 !important; color: #fff !important; overflow-x: hidden; }
      `}</style>
      {isLoading && <LoadingScreen />}
      <Navigation />
      <main style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s' }}>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;