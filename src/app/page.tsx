'use client';

import React, { useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Calendar, MapPin, Code, Briefcase, GraduationCap, User, Menu, X, ChevronRight, Terminal, Zap, Globe, Database, Server, Languages } from 'lucide-react';

// 定义类型接口
interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  achievements: string[];
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  status: 'completed' | 'in-progress' | 'concept';
}

type Language = 'zh' | 'en';
type PageType = 'home' | 'about' | 'experience' | 'projects' | 'contact';

const App = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>('zh');

  const navigateTo = (page: PageType) => {
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
        name: "Tony Wen",
        title: "移动应用开发工程师",
        subtitle: "移动开发 // 全栈 // 创新",
        email: "ts2015656@gmail.com",
        location: "悉尼，澳大利亚",
        description: "我是一名专注于移动应用开发的软件工程师，擅长跨平台应用开发和后端系统设计。目前在悉尼大学攻读软件工程荣誉学位，具有丰富的实习和项目经验。"
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
        fullstackDev: "移动应用开发 & 全栈系统设计",
        intro1: "我是一名专注于移动应用开发的软件工程师，目前在悉尼大学攻读软件工程荣誉学位。从跨平台移动应用到后端系统架构，我致力于创造高效、用户友好的数字解决方案。",
        intro2: "在实习和项目经历中，我积累了丰富的React Native、Spring Boot和云服务开发经验。我热衷于学习新技术，追求代码的优雅和性能的极致，相信技术能够改善人们的生活。"
      },
      // 经历页面
      experience: {
        title: "我的",
        experience: "经历",
        skills: "技能标签",
        achievements: "主要成就",
        experiences: [
          {
            title: '移动应用开发工程师',
            company: 'Art Flâneur',
            period: '2025.03 - 至今',
            description: '负责跨平台白标地图应用MVP的开发，使用React Native和MapLibre GL集成。领导团队实现了实时地理跟踪功能，并优化了iOS和Android的电池使用效率。',
            skills: ['React Native', 'MapLibre GL', 'GraphQL', 'Auth0', 'Radar SDK'],
            achievements: ['实现<3秒启动时间', '优化地图渲染至30+ FPS', '构建白标定制系统']
          },
          {
            title: '软件开发实习生',
            company: 'Challenz',
            period: '2023.09 - 2024.02',
            description: '参与移动应用开发，专注于后端功能和前端优化。设计Supabase数据库架构，提升查询性能40%，开发边缘函数减少服务器负载25%。',
            skills: ['React Native', 'Supabase', 'Edge Functions', 'TypeScript'],
            achievements: ['查询性能提升40%', '服务器负载减少25%', '启动时间优化20%']
          },
          {
            title: '研究实习生',
            company: 'Xinsong Robot Automation Co., Ltd',
            period: '2023.12 - 2024.02',
            description: '专注于工业机器人的计算机视觉和自主导航研究。开发了配备摄像头的机器人自主路径规划算法，导航精度提升85%。',
            skills: ['计算机视觉', '机器人导航', 'Python', '算法优化'],
            achievements: ['导航精度提升85%', '完成50+次实地测试', '测试时间减少15%']
          },
          {
            title: '软件工程荣誉学士',
            company: '悉尼大学',
            period: '2023.03 - 至今',
            description: '主修软件工程，获得多项认证包括Google AI Essentials、Google IT Support等。积极参与hackathon竞赛，在2024 SYNCS Hackathon中获得前5名。',
            skills: ['软件工程', 'AI/ML', '系统设计', '敏捷开发'],
            achievements: ['荣誉学位在读', 'Hackathon前5名', '多项Google认证']
          }
        ] as Experience[]
      },
      // 项目页面
      projects: {
        title: "我的",
        projects: "项目",
        subtitle: "探索我开发的移动应用和全栈项目，从健身追踪App到实时聊天平台，每个项目都体现了我在技术上的成长和创新。",
        techStack: "技术栈",
        code: "代码",
        demo: "演示",
        completed: "已完成",
        inProgress: "进行中",
        concept: "概念阶段",
        projectList: [
          {
            title: 'Smart Fitness Assistant',
            description: '使用React Native和Spring Boot开发的全栈健身追踪移动应用。实现了锻炼跟踪、饮食监控和个性化健身目标功能。构建RESTful API支持用户管理、锻炼/饮食记录和统计分析，采用JWT认证和基于角色的访问控制。',
            tech: ['React Native', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'AWS', 'Docker'],
            status: 'completed'
          },
          {
            title: 'Brief Notes - 个人理财iOS应用',
            description: '使用SwiftUI和Core Data开发的双语支出跟踪iOS应用。实现自动交易记录功能，可解析微信支付和Apple Pay的短信通知。集成SwiftUI Charts进行交互式数据可视化，支持实时汇率转换和自定义快捷交易。',
            tech: ['SwiftUI', 'Core Data', 'WidgetKit', 'Charts', 'NLP'],
            status: 'completed'
          },
          {
            title: 'Chat Website (2024 SYNCS Hackathon)',
            description: '在2024 SYNCS Hackathon中获得前5名的实时聊天平台。使用Flask后端和Jinja模板开发，实现安全的用户认证和MySQL数据库存储。集成基于OpenCV的视频聊天功能，采用Git进行敏捷开发团队协作。',
            tech: ['Flask', 'Jinja', 'HTML/CSS/JavaScript', 'MySQL', 'OpenCV', 'Git'],
            status: 'completed'
          },
          {
            title: 'Art Flâneur 地图应用',
            description: '正在开发的跨平台白标地图应用MVP，集成MapLibre GL和实时地理跟踪功能。实现了优化的电池使用、GraphQL查询的交互式地点详情、Auth0多种登录方式支持，以及使用Radar SDK的地理围栏系统。',
            tech: ['React Native', 'MapLibre GL', 'GraphQL', 'Auth0', 'Radar SDK'],
            status: 'in-progress'
          }
        ] as Project[]
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
        openToOpportunities: "开放实习和工作机会",
        remoteWork: "可接受远程工作",
        techCommunication: "乐于技术交流和学习",
        projectCooperation: "项目合作",
        projectCoopDesc: "移动应用开发、全栈开发、系统架构设计等项目合作机会。",
        techExchange: "技术交流",
        techExchangeDesc: "开源项目讨论、技术分享、代码审查、学习经验交流等活动。",
        careerOpportunities: "职业机会",
        careerOpportunitiesDesc: "实习机会、毕业生职位、远程工作、技术团队合作等职业发展机会。",
        contactNow: "立即联系",
        tags: {
          remoteWork: "远程实习",
          longTerm: "长期学习", 
          consulting: "技术指导",
          openSource: "开源贡献",
          sharing: "技术分享",
          codeReview: "代码审查",
          fullTime: "实习机会",
          remote: "远程工作",
          startup: "创业团队"
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
        name: "Tony Wen",
        title: "Mobile Application Developer",
        subtitle: "Mobile Dev // Full Stack // Innovation",
        email: "ts2015656@gmail.com",
        location: "Sydney, Australia",
        description: "I am a software engineer specializing in mobile application development, with expertise in cross-platform app development and backend system design. Currently pursuing Software Engineering Honours at University of Sydney with rich internship and project experience."
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
        fullstackDev: "Mobile Application Development & Full Stack System Design",
        intro1: "I am a software engineer specializing in mobile application development, currently pursuing Software Engineering Honours at University of Sydney. From cross-platform mobile applications to backend system architecture, I am committed to creating efficient and user-friendly digital solutions.",
        intro2: "Through my internship and project experiences, I have accumulated rich experience in React Native, Spring Boot, and cloud service development. I am passionate about learning new technologies, pursuing code elegance and performance excellence, believing that technology can improve people's lives."
      },
      // Experience Page
      experience: {
        title: "My",
        experience: "Experience",
        skills: "Skills",
        achievements: "Key Achievements",
        experiences: [
          {
            title: 'Mobile Application Developer',
            company: 'Art Flâneur',
            period: '03.2025 - Present',
            description: 'Led development of cross-platform white-label mapping application MVP using React Native with MapLibre GL integration. Implemented real-time geo-tracking functionality with optimized battery usage for iOS and Android.',
            skills: ['React Native', 'MapLibre GL', 'GraphQL', 'Auth0', 'Radar SDK'],
            achievements: ['Achieved <3s startup times', 'Optimized to 30+ FPS map rendering', 'Built white-label customization system']
          },
          {
            title: 'Software Development Intern',
            company: 'Challenz',
            period: '09.2023 - 02.2024',
            description: 'Contributed to mobile application development with focus on backend functionality and frontend optimization. Designed Supabase database architecture, improving query performance by 40%.',
            skills: ['React Native', 'Supabase', 'Edge Functions', 'TypeScript'],
            achievements: ['Improved query performance by 40%', 'Reduced server load by 25%', 'Optimized startup time by 20%']
          },
          {
            title: 'Research Intern',
            company: 'Xinsong Robot Automation Co., Ltd',
            period: '12.2023 - 02.2024',
            description: 'Conducted research on industrial robotics focusing on computer vision and autonomous navigation. Developed autonomous pathfinding algorithm for camera-equipped robots.',
            skills: ['Computer Vision', 'Robot Navigation', 'Python', 'Algorithm Optimization'],
            achievements: ['85% improvement in navigation accuracy', '50+ field tests completed', '15% reduction in testing time']
          },
          {
            title: 'Bachelor of Software Engineering (Honours)',
            company: 'University of Sydney',
            period: '03.2023 - Present',
            description: 'Majoring in Software Engineering with multiple certifications including Google AI Essentials, Google IT Support. Active participant in hackathons, achieved Top 5 in 2024 SYNCS Hackathon.',
            skills: ['Software Engineering', 'AI/ML', 'System Design', 'Agile Development'],
            achievements: ['Honours Degree in Progress', 'Top 5 Hackathon Finalist', 'Multiple Google Certifications']
          }
        ] as Experience[]
      },
      // Projects Page
      projects: {
        title: "My",
        projects: "Projects",
        subtitle: "Explore my mobile applications and full-stack projects, from fitness tracking apps to real-time chat platforms, each project reflects my technical growth and innovation.",
        techStack: "Tech Stack",
        code: "Code",
        demo: "Demo", 
        completed: "Completed",
        inProgress: "In Progress",
        concept: "Concept",
        projectList: [
          {
            title: 'Smart Fitness Assistant',
            description: 'Comprehensive fitness tracking mobile app developed using React Native and Spring Boot. Implemented core features including workout tracking, diet monitoring, and personalized fitness goals. Built RESTful APIs with JWT-based authentication and role-based access control.',
            tech: ['React Native', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'AWS', 'Docker'],
            status: 'completed'
          },
          {
            title: 'Brief Notes - Personal Finance iOS App',
            description: 'Bilingual expense tracking iOS app using SwiftUI and Core Data. Built automatic transaction recording feature that parses SMS notifications from WeChat Pay and Apple Pay. Created interactive data visualization with SwiftUI Charts for expense analysis.',
            tech: ['SwiftUI', 'Core Data', 'WidgetKit', 'Charts', 'NLP'],
            status: 'completed'
          },
          {
            title: 'Chat Website (2024 SYNCS Hackathon)',
            description: 'Top 5 finalist real-time chat platform developed using Flask backend and Jinja templating. Implemented secure user authentication and database storage using MySQL. Integrated video chat functionality using Python OpenCV library.',
            tech: ['Flask', 'Jinja', 'HTML/CSS/JavaScript', 'MySQL', 'OpenCV', 'Git'],
            status: 'completed'
          },
          {
            title: 'Art Flâneur Mapping Application',
            description: 'Cross-platform white-label mapping application MVP with MapLibre GL integration and real-time geo-tracking functionality. Features optimized battery usage, interactive place details via GraphQL queries, and Auth0 authentication system.',
            tech: ['React Native', 'MapLibre GL', 'GraphQL', 'Auth0', 'Radar SDK'],
            status: 'in-progress'
          }
        ] as Project[]
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
        openToOpportunities: "Open to internship and job opportunities",
        remoteWork: "Available for remote work",
        techCommunication: "Enjoy technical communication and learning",
        projectCooperation: "Project Cooperation",
        projectCoopDesc: "Mobile application development, full-stack development, system architecture design and other project collaboration opportunities.",
        techExchange: "Technical Exchange",
        techExchangeDesc: "Open source project discussions, technical sharing, code reviews, learning experience exchanges and other activities.",
        careerOpportunities: "Career Opportunities", 
        careerOpportunitiesDesc: "Internship opportunities, graduate positions, remote work, technical team collaboration and other career development opportunities.",
        contactNow: "Contact Now",
        tags: {
          remoteWork: "Remote Internship",
          longTerm: "Long-term Learning",
          consulting: "Technical Mentoring",
          openSource: "Open Source",
          sharing: "Tech Sharing",
          codeReview: "Code Review",
          fullTime: "Internship",
          remote: "Remote Work",
          startup: "Startup Team"
        }
      }
    }
  };

  const t = texts[language];

  const navItems = [
    { id: 'home' as PageType, label: t.nav.home, icon: Terminal },
    { id: 'about' as PageType, label: t.nav.about, icon: User },
    { id: 'experience' as PageType, label: t.nav.experience, icon: Briefcase },
    { id: 'projects' as PageType, label: t.nav.projects, icon: Code },
    { id: 'contact' as PageType, label: t.nav.contact, icon: Mail }
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
          <div style={{ marginBottom: '32px', position: 'relative' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={styles.glowingAvatar}>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
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

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '48px'
          }}>
            {['React Native', 'TypeScript', 'Spring Boot', 'Swift', 'PostgreSQL', 'AWS'].map((skill) => (
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                { category: 'Mobile & Frontend', skills: ['React Native', 'SwiftUI', 'TypeScript', 'JavaScript'], icon: Globe },
                { category: 'Backend & Frameworks', skills: ['Spring Boot', 'Flask', '.NET Core', 'Node.js'], icon: Server },
                { category: 'Database & Cloud', skills: ['PostgreSQL', 'MongoDB', 'AWS', 'Azure'], icon: Database },
                { category: 'Tools & Languages', skills: ['Java', 'Python', 'Swift', 'Git', 'Docker'], icon: Zap }
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
                      onClick={() => window.open('https://github.com/ts2015656', '_blank')}
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
                  onClick={() => window.open('https://github.com/ts2015656', '_blank')}
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
                  onClick={() => window.open('https://linkedin.com/in/tony-wen-sydney', '_blank')}
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