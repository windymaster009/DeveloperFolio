/* Kevin Nhim's DeveloperFolio
 * Based on saadpasta/developerFolio (GPL-3.0).
 * Modified for Kevin Nhim / Windy.
 */

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation";

const splashScreen = {
  enabled: true,
  animation: splashAnimation,
  duration: 2000
};

const illustration = {
  animated: true
};

const greeting = {
  username: "Kevin Nhim",
  title: "Hi all, I'm Kevin",
  subTitle: emoji(
    "A passionate Software Developer 🚀 from Cambodia building web applications, backend services, payment-platform features, Telegram and Discord bots, automation tools, APIs, and Raspberry Pi/self-hosted systems."
  ),
  resumeLink:
    "https://github.com/windymaster009/kevin.github.io/raw/main/CV.pdf",
  displayGreeting: true
};

const socialMediaLinks = {
  github: "https://github.com/windymaster009",
  linkedin: "",
  gmail: "Kevinnhim123@gmail.com",
  gitlab: "",
  facebook: "",
  instagram: "",
  twitter: "https://x.com/nhimkevins",
  telegram: "https://t.me/nhimkevin",
  medium: "",
  stackoverflow: "",
  kaggle: "",
  display: true
};

const skillsSection = {
  title: "What I do",
  subTitle:
    "SOFTWARE DEVELOPER WHO ENJOYS BUILDING REAL PRODUCTS, AUTOMATION AND SELF-HOSTED SYSTEMS",
  skills: [
    emoji(
      "⚡ Build backend services, REST APIs, integrations, transaction workflows and operational tools"
    ),
    emoji(
      "⚡ Develop responsive full-stack web applications, dashboards and admin/merchant interfaces"
    ),
    emoji(
      "⚡ Create Telegram and Discord bots, automation workflows, payment listeners and queue-based systems"
    ),
    emoji(
      "⚡ Deploy and operate applications on Linux and Raspberry Pi using PM2, Cloudflare Tunnel and Tailscale"
    )
  ],
  softwareSkills: [
    {skillName: "JavaScript", fontAwesomeClassname: "fab fa-js", brandColor: "#f7df1e"},
    {skillName: "TypeScript", imageSrc: require("./assets/images/typescriptLogo.svg"), brandColor: "#3178c6"},
    {skillName: "Python", fontAwesomeClassname: "fab fa-python", brandColor: "#3776ab"},
    {skillName: "Java", fontAwesomeClassname: "fab fa-java", brandColor: "#007396"},
    {skillName: "PHP", fontAwesomeClassname: "fab fa-php", brandColor: "#777bb4"},
    {skillName: "HTML5", fontAwesomeClassname: "fab fa-html5", brandColor: "#e34f26"},
    {skillName: "CSS3", fontAwesomeClassname: "fab fa-css3-alt", brandColor: "#1572b6"},
    {skillName: "React", fontAwesomeClassname: "fab fa-react", brandColor: "#61dafb"},
    {skillName: "Node.js", fontAwesomeClassname: "fab fa-node-js", brandColor: "#339933"},
    {skillName: "Vue.js", fontAwesomeClassname: "fab fa-vuejs", brandColor: "#4fc08d"},
    {skillName: "Laravel", fontAwesomeClassname: "fab fa-laravel", brandColor: "#ff2d20"},
    {skillName: "MongoDB", imageSrc: require("./assets/images/mongodbLogo.svg"), brandColor: "#47a248"},
    {skillName: "Docker", fontAwesomeClassname: "fab fa-docker", brandColor: "#2496ed"},
    {skillName: "Linux", fontAwesomeClassname: "fab fa-linux", brandColor: "#111111"},
    {skillName: "Git", fontAwesomeClassname: "fab fa-git-alt", brandColor: "#f05032"},
    {skillName: "Telegram", fontAwesomeClassname: "fab fa-telegram-plane", brandColor: "#26a5e4"},
    {skillName: "Discord", fontAwesomeClassname: "fab fa-discord", brandColor: "#5865f2"},
    {skillName: "Raspberry Pi", fontAwesomeClassname: "fab fa-raspberry-pi", brandColor: "#a22846"}
  ],
  display: true
};

const educationInfo = {
  display: true,
  schools: [
    {
      schoolName: "National Polytechnic Institute of Cambodia (NPIC)",
      logo: "https://pbs.twimg.com/media/DUR8h5IX4AAhV0V.jpg",
      imageType: "logo",
      accentColor: "#273b97",
      schoolLink: "https://npic.edu.kh/en/",
      subHeader: "Computer Science",
      duration: "2020 - 2024",
      desc:
        "Studied Computer Science while expanding practical experience in software development, IT support and systems.",
      descBullets: [
        "Web development, programming, databases and software engineering",
        "Built personal projects across JavaScript, Python, Java, PHP and modern web stacks"
      ]
    },
    {
      schoolName: "Paññāsāstra University of Cambodia (PUC)",
      logo: "https://www.puc.edu.kh/wp-content/uploads/2024/09/Logo-4.jpg",
      imageType: "logo",
      accentColor: "#173b9a",
      schoolLink: "https://www.puc.edu.kh/",
      subHeader: "Loyola School",
      duration: "2018 - 2020",
      desc:
        "Continued my secondary education in an English-focused academic environment before moving into Computer Science."
    },
    {
      schoolName: "Samdech Hun Sen Phnom Penh Thmey High School",
      logo: "/schools/highschool.jpg",
      imageType: "photo",
      accentColor: "#c83436",
      subHeader: "High School",
      duration: "2007 - 2019",
      desc:
        "My earlier school years in Phnom Penh before continuing into university and Computer Science."
    }
  ]
};

const techStack = {
  viewSkillBars: true,
  experience: [
    {
      Stack: "Backend / APIs",
      progressPercentage: "92%",
      color: "#6c63ff",
      description: "Services, APIs, integrations and business workflows"
    },
    {
      Stack: "Automation / Bots",
      progressPercentage: "90%",
      color: "#26a5e4",
      description: "Bots, queues, listeners and scheduled automation"
    },
    {
      Stack: "Frontend / Full Stack",
      progressPercentage: "84%",
      color: "#20bf6b",
      description: "Responsive interfaces connected to real backend systems"
    },
    {
      Stack: "Linux / Self-hosting",
      progressPercentage: "86%",
      color: "#ff8a00",
      description: "Raspberry Pi, PM2, tunnels and production operations"
    }
  ],
  displayCodersrank: false
};

const workExperiences = {
  display: true,
  experience: [
    {
      role: "Software Developer",
      company: "Payment Platform",
      companylogo: require("./assets/images/fintechLogo.svg"),
      date: "Current",
      desc:
        "Building and maintaining production payment-platform features across backend services, admin tools and merchant interfaces.",
      descBullets: [
        "Backend APIs, transaction workflows, validation, logging and operational tooling",
        "Payment, payout, settlement and transfer-related features",
        "Queue, scheduler, database and external-service integrations",
        "UAT testing, deployment and production-focused debugging"
      ]
    },
    {
      role: "IT Support",
      company: "CISA",
      companylogo: require("./assets/images/cisaLogo.svg"),
      date: "Started November 2022",
      desc:
        "Provided hands-on IT support and troubleshooting across hardware, software, networking and day-to-day technical operations.",
      descBullets: [
        "Hardware and software troubleshooting",
        "Network and workstation support",
        "Practical user support and system maintenance"
      ]
    },
    {
      role: "Independent Developer",
      company: "Personal & Open Source Projects",
      companylogo: require("./assets/images/automationLogo.svg"),
      date: "Ongoing",
      desc:
        "Designing, shipping and self-hosting practical projects across bots, automation, web applications and home-server tooling.",
      descBullets: [
        "Telegram commerce, storage and automation systems",
        "Discord utilities and scheduled workflows",
        "Raspberry Pi services with PM2, Cloudflare Tunnel and Tailscale"
      ]
    },

    // Three extra experience slots are ready for you.
    // Change display to true and replace the content when you want to publish one.
    {
      display: false,
      role: "Experience Slot 4",
      company: "Add Company",
      companylogo: require("./assets/images/automationLogo.svg"),
      date: "Add Date",
      desc: "Add your experience description here.",
      descBullets: []
    },
    {
      display: false,
      role: "Experience Slot 5",
      company: "Add Company",
      companylogo: require("./assets/images/automationLogo.svg"),
      date: "Add Date",
      desc: "Add your experience description here.",
      descBullets: []
    },
    {
      display: false,
      role: "Experience Slot 6",
      company: "Add Company",
      companylogo: require("./assets/images/automationLogo.svg"),
      date: "Add Date",
      desc: "Add your experience description here.",
      descBullets: []
    }
  ]
};

const openSource = {
  showGithubProfile: "true",
  display: true
};

const bigProjects = {
  title: "Big Projects",
  subtitle: "SOME OF THE SYSTEMS, BOTS AND APPLICATIONS I HAVE BUILT",
  projects: [
    {
      image: require("./assets/images/eshopLogo.svg"),
      projectName: "Telegram E-Shop",
      projectDesc:
        "A Telegram-based digital product shop with product inventory, wallet and deposit flows, KHQR payments, automated payment listening, admin tools and Raspberry Pi deployment.",
      footerLink: [
        {
          name: "GitHub",
          url: "https://github.com/windymaster009/telegrambot-py-eshop"
        }
      ]
    },
    {
      image: require("./assets/images/telegramDriveLogo.svg"),
      projectName: "Telegram Drive",
      projectDesc:
        "A Telegram-centered storage and file workflow system designed around practical bot and API access.",
      footerLink: [
        {
          name: "GitHub",
          url: "https://github.com/windymaster009/Telegram-Drive"
        }
      ]
    },
    {
      image: require("./assets/images/solarHomeLogo.svg"),
      projectName: "Solar Home",
      projectDesc:
        "A self-hosted Raspberry Pi web project with frontend/backend services, PM2 process management and secure remote access.",
      footerLink: [
        {
          name: "GitHub",
          url: "https://github.com/windymaster009/solarhome"
        }
      ]
    },
    {
      image: require("./assets/images/automationLogo.svg"),
      projectName: "Automation Projects",
      projectDesc:
        "Scheduled messaging, Discord utilities, browser automation and other tools built to remove repetitive manual work.",
      footerLink: [
        {
          name: "GitHub Profile",
          url: "https://github.com/windymaster009"
        }
      ]
    }
  ],
  display: true
};

const achievementSection = {
  title: emoji("Achievements & Highlights 🏆"),
  subtitle:
    "A FEW THINGS I AM PROUD TO HAVE DESIGNED, BUILT OR OPERATED END TO END",
  achievementsCards: [
    {
      title: "Production Self-Hosting",
      subtitle:
        "Operate multiple applications on a Raspberry Pi using Linux, PM2, tunnels, remote networking and automated restarts.",
      image: require("./assets/images/piHighlight.svg"),
      imageAlt: "Raspberry Pi self hosting",
      footerLink: [
        {
          name: "Solar Home",
          url: "https://github.com/windymaster009/solarhome"
        }
      ]
    },
    {
      title: "Automation & Bot Systems",
      subtitle:
        "Built Telegram and Discord systems with queues, payment listeners, admin workflows, scheduling and automated user flows.",
      image: require("./assets/images/botHighlight.svg"),
      imageAlt: "Automation and bots",
      footerLink: [
        {
          name: "Telegram E-Shop",
          url: "https://github.com/windymaster009/telegrambot-py-eshop"
        }
      ]
    },
    {
      title: "Multi-Stack Builder",
      subtitle:
        "Projects span JavaScript, TypeScript, Python, Java, PHP/Laravel, Vue, React, bots, automation and systems tooling.",
      image: require("./assets/images/codeHighlight.svg"),
      imageAlt: "Multi stack development",
      footerLink: [
        {
          name: "GitHub Profile",
          url: "https://github.com/windymaster009"
        }
      ]
    }
  ],
  display: true
};

const blogSection = {
  title: "Blogs",
  subtitle: "",
  displayMediumBlogs: "false",
  blogs: [],
  display: false
};

const talkSection = {
  title: "TALKS",
  subtitle: "",
  talks: [],
  display: false
};

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "",
  podcast: [],
  display: false
};

const resumeSection = {
  title: "Resume",
  subtitle: "View or download my resume",
  display: true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project, software, automation or just want to say hi? My inbox is open.",
  number: "",
  email_address: "Kevinnhim123@gmail.com"
};

const twitterDetails = {
  userName: "nhimkevins",
  display: false
};

const isHireable = null;

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
