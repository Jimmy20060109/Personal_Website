import './About.css'
import WaterlooLogo from '../images/waterlooLoGo.svg'
import KinaxisLogo from '../images/kinaxis_Logo.png'
import { useTranslations } from '../i18n/LanguageContext'

const translations = {
  en: {
    title: 'About',
    introduction: {
      intro: "I'm a ",
      role: 'software engineer',
      beforeStudy: ' and a ',
      study: '3A Data Science student',
      beforeUniversity: ' at the ',
      universityName: 'University of Waterloo',
      universityLogoAlt: 'University of Waterloo Logo',
      beforeSystems: ', with a strong interest in building ',
      systems: 'modern, efficient, and well-engineered software systems',
      beforePerspectives:
        '. With a background in data science and hands-on industry experience, I approach problems from both ',
      perspectives: 'theoretical and practical engineering perspectives',
      ending: '.',
    },
    currentRole: {
      intro: 'In my current co-op as an ',
      role: 'Algorithm Intern',
      beforeCompany: ' at ',
      companyName: 'Kinaxis Inc.',
      companyLogoAlt: 'Kinaxis Inc. Logo',
      description:
        ', I engineered and deployed core infrastructure for a momentum-based stock analytics SaaS platform, transforming Python ML trading models into a production-ready full-stack system with real-time screening.',
      beforePerformance:
        ' I designed a modular Vue 3 architecture that reduced redundant API calls and improved chart/watchlist load performance by ',
      beforeDelivery:
        ', and built secure authentication plus Stripe-based subscription workflows in TypeScript. I also applied AI-assisted development (Cursor) across Vue, TypeScript, Go, and Python to increase feature throughput by ',
      ending: ' while maintaining strong code quality and reliability.',
    },
    compilerExperience: {
      intro: 'I also have experience in ',
      specialty: 'compiler and systems-level development',
      beforeCompany: '. During my co-op at ',
      companyName: 'Emerson / NI',
      beforeCompiler: ', I worked on a ',
      compiler: 'LabVIEW-to-native-code compiler',
      description:
        ' using C++, Python, and AST-based compilation pipelines, strengthening my understanding of low-level execution models and how high-level abstractions translate into efficient machine code.',
    },
    interests: {
      intro: 'In addition, I actively use ',
      workflows: 'AI-assisted development workflows',
      beforeTools: ' and advanced agent-based IDEs such as ',
      tools: 'Cursor and Codex',
      beforeOpportunity:
        ' to accelerate prototyping, refactoring, and tooling development. My interests lie at the intersection of frontend engineering, AI-powered tooling, and developer productivity, and I\'m currently seeking opportunities to work on ',
      opportunity: 'impactful, technically challenging projects',
      ending: '.',
    },
  },
  zh: {
    title: '关于我',
    introduction: {
      intro: '我是一名',
      role: '软件工程师',
      beforeStudy: '，也是',
      study: '3A 数据科学学生',
      beforeUniversity: '，就读于',
      universityName: '滑铁卢大学',
      universityLogoAlt: '滑铁卢大学 Logo',
      beforeSystems: '。我对构建',
      systems: '现代、高效、工程质量扎实的软件系统',
      beforePerspectives:
        '有强烈兴趣。凭借数据科学背景和行业实践经验，我会同时从',
      perspectives: '理论与工程落地',
      ending: '两个角度思考问题。',
    },
    currentRole: {
      intro: '在目前的实习中，我担任',
      role: '算法实习生',
      beforeCompany: '，就职于',
      companyName: 'Kinaxis Inc.',
      companyLogoAlt: 'Kinaxis 公司 Logo',
      description:
        '。我为一个基于动量策略的股票分析 SaaS 平台设计并部署核心基础设施，将 Python 机器学习交易模型转化为支持实时筛选的生产级全栈系统。',
      beforePerformance:
        '我设计了模块化 Vue 3 架构，减少重复 API 调用，并将图表和 watchlist 的加载性能提升',
      beforeDelivery:
        '；同时使用 TypeScript 构建安全认证和 Stripe 订阅流程。我也在 Vue、TypeScript、Go 与 Python 中应用 Cursor 等 AI 辅助开发工作流，在保持代码质量和可靠性的同时，将功能交付效率提升',
      ending: '。',
    },
    compilerExperience: {
      intro: '我也有',
      specialty: '编译器和系统级开发',
      beforeCompany: '经验。在我于 ',
      companyName: 'Emerson / NI',
      beforeCompiler: ' 实习期间，我参与了',
      compiler: 'LabVIEW 到原生代码的编译器',
      description:
        '开发，使用 C++、Python 和基于 AST 的编译流水线，加深了对底层执行模型以及高级抽象如何转化为高效机器码的理解。',
    },
    interests: {
      intro: '此外，我积极使用',
      workflows: 'AI 辅助开发工作流',
      beforeTools: '以及 ',
      tools: 'Cursor 和 Codex',
      beforeOpportunity:
        ' 等智能 IDE 来加速原型开发、重构和工具构建。我的兴趣集中在前端工程、AI 驱动工具和开发者效率的交叉领域，目前正在寻找能够参与',
      opportunity: '有影响力且技术挑战性的项目',
      ending: '的机会。',
    },
  },
}

const About = () => {
  const t = useTranslations(translations)

  return (
    <section id="about" className="about">
      <h2 className="section-title">{t.title}</h2>
      <div className="about-content">
        <p className="about-text">
          {t.introduction.intro}
          <strong>{t.introduction.role}</strong>
          {t.introduction.beforeStudy}
          <strong>{t.introduction.study}</strong>
          {t.introduction.beforeUniversity}
          <a
            href="https://uwaterloo.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="about-link"
          >
            {t.introduction.universityName}
          </a>
          <img
            src={WaterlooLogo}
            alt={t.introduction.universityLogoAlt}
            className="waterloo-logo-inline"
          />
          {t.introduction.beforeSystems}
          <span className="about-highlight">{t.introduction.systems}</span>
          {t.introduction.beforePerspectives}
          <span className="about-highlight">{t.introduction.perspectives}</span>
          {t.introduction.ending}
        </p>
        <p className="about-text">
          {t.currentRole.intro}
          <strong>{t.currentRole.role}</strong>
          {t.currentRole.beforeCompany}
          <a
            href="https://www.kinaxis.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="about-link"
          >
            {t.currentRole.companyName}
          </a>
          <img
            src={KinaxisLogo}
            alt={t.currentRole.companyLogoAlt}
            className="waterloo-logo-inline"
          />
          {t.currentRole.description}
          {t.currentRole.beforePerformance}
          <strong>30%</strong>
          {t.currentRole.beforeDelivery}
          <strong>40%</strong>
          {t.currentRole.ending}
        </p>
        <p className="about-text">
          {t.compilerExperience.intro}
          <span className="about-highlight">{t.compilerExperience.specialty}</span>
          {t.compilerExperience.beforeCompany}
          <a
            href="https://www.ni.com/en.html"
            target="_blank"
            rel="noopener noreferrer"
            className="about-link"
          >
            {t.compilerExperience.companyName}
          </a>
          {t.compilerExperience.beforeCompiler}
          <strong>{t.compilerExperience.compiler}</strong>
          {t.compilerExperience.description}
        </p>
        <p className="about-text">
          {t.interests.intro}
          <span className="about-highlight">{t.interests.workflows}</span>
          {t.interests.beforeTools}
          <span className="about-highlight">{t.interests.tools}</span>
          {t.interests.beforeOpportunity}
          <strong>{t.interests.opportunity}</strong>
          {t.interests.ending}
        </p>
      </div>
    </section>
  )
}

export default About
