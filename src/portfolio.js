/* Kevin Nhim's DeveloperFolio
 * Based on saadpasta/developerFolio (GPL-3.0).
 */

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation";

const splashScreen = {
  enabled: true,
  animation: splashAnimation,
  duration: 1800
};

const illustration = {
  animated: true
};

const greeting = {
  username: "Kevin Nhim",
  title: "Hi all, I'm Kevin",
  subTitle: emoji(
    "A passionate Software Developer 🚀 building payment platforms, web applications, Telegram and Discord bots, automation tools, APIs, and Raspberry Pi/self-hosted systems with JavaScript, TypeScript, Python, Node.js, React, MongoDB and more."
  ),
  resumeLink: "",
  displayGreeting: true
};

const socialMediaLinks = {
  github: "https://github.com/windymaster009",
  linkedin: "",
  gmail: "",
  gitlab: "",
  facebook: "",
  instagram: "",
  twitter: "",
  medium: "",
  stackoverflow: "",
  kaggle: "",
  display: true
};

const skillsSection = {
  title: "What I do",
  subTitle:
    "SOFTWARE DEVELOPER WHO LOVES BACKEND, AUTOMATION, FULL STACK APPLICATIONS AND SYSTEMS",
  skills: [
    emoji("⚡ Build backend services, REST APIs, integrations and real-world business workflows"),
    emoji("⚡ Create full-stack web applications, dashboards, bots and automation tools"),
    emoji("⚡ Deploy and operate applications on Linux and Raspberry Pi with PM2, tunnels and cloud services"),
    emoji("⚡ Work with databases, queues, payment flows, Telegram/Discord APIs and external services")
  ],
  softwareSkills: [
    {skillName: "JavaScript", fontAwesomeClassname: "fab fa-js"},
    {skillName: "TypeScript", fontAwesomeClassname: "fas fa-code"},
    {skillName: "React", fontAwesomeClassname: "fab fa-react"},
    {skillName: "Node.js", fontAwesomeClassname: "fab fa-node-js"},
    {skillName: "Python", fontAwesomeClassname: "fab fa-python"},
    {skillName: "HTML5", fontAwesomeClassname: "fab fa-html5"},
    {skillName: "CSS3", fontAwesomeClassname: "fab fa-css3-alt"},
    {skillName: "PHP", fontAwesomeClassname: "fab fa-php"},
    {skillName: "Database", fontAwesomeClassname: "fas fa-database"},
    {skillName: "Docker", fontAwesomeClassname: "fab fa-docker"},
    {skillName: "Linux", fontAwesomeClassname: "fab fa-linux"},
    {skillName: "Git", fontAwesomeClassname: "fab fa-git-alt"},
    {skillName: "Telegram", fontAwesomeClassname: "fab fa-telegram-plane"},
    {skillName: "Discord", fontAwesomeClassname: "fab fa-discord"},
    {skillName: "Raspberry Pi", fontAwesomeClassname: "fab fa-raspberry-pi"}
  ],
  display: true
};

const educationInfo = {
  display: false,
  schools: []
};

const techStack = {
  viewSkillBars: true,
  experience: [
    {Stack: "Backend / APIs", progressPercentage: "92%"},
    {Stack: "Automation / Bots", progressPercentage: "90%"},
    {Stack: "Frontend / Full Stack", progressPercentage: "82%"},
    {Stack: "Linux / Self-hosting", progressPercentage: "84%"}
  ],
  displayCodersrank: false
};

const workExperiences = {
  display: true,
  experience: [
    {
      role: "Software Developer",
      company: "Fintech & Payment Platform",
      companylogo: require("./assets/images/fintechLogo.svg"),
      date: "Current",
      desc:
        "Building and maintaining production payment-platform features across backend services and web interfaces.",
      descBullets: [
        "Backend APIs, transaction workflows, validation, logging and operational tooling",
        "Admin and merchant interfaces with production-focused testing and deployment",
        "Queue, scheduler, database and external-service integrations"
      ]
    },
    {
      role: "Independent Developer & Automation Builder",
      company: "Personal / Open Source Projects",
      companylogo: require("./assets/images/automationLogo.svg"),
      date: "Ongoing",
      desc:
        "Designing, shipping and self-hosting practical tools across bots, automation, web apps and home-server projects.",
      descBullets: [
        "Telegram commerce, storage, management and automation systems",
        "Discord utilities and scheduled automation",
        "Raspberry Pi deployment, PM2 process management and Cloudflare/Tailscale networking"
      ]
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
        "A Telegram-based digital product shop with product inventory, wallet/deposit flows, KHQR payment handling, automated payment listening, admin tools and Raspberry Pi deployment.",
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
        "A Telegram-centered storage and file workflow project designed to make file management and access practical through bot/API tooling.",
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
        "A self-hosted Raspberry Pi web project combining a frontend/backend service stack with process management and secure remote access.",
      footerLink: [
        {
          name: "GitHub",
          url: "https://github.com/windymaster009/solarhome"
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
        "Operate multiple services on a Raspberry Pi using Linux, PM2, tunnels and remote networking.",
      image: require("./assets/images/piHighlight.svg"),
      imageAlt: "Raspberry Pi self hosting",
      footerLink: [
        {name: "Solar Home", url: "https://github.com/windymaster009/solarhome"}
      ]
    },
    {
      title: "Automation & Bot Systems",
      subtitle:
        "Built Telegram and Discord tools with queues, payment listeners, admin workflows and automated user flows.",
      image: require("./assets/images/botHighlight.svg"),
      imageAlt: "Automation and bots",
      footerLink: [
        {name: "E-Shop", url: "https://github.com/windymaster009/telegrambot-py-eshop"}
      ]
    },
    {
      title: "Multi-Stack Builder",
      subtitle:
        "Public GitHub projects span web development, Python, JavaScript, PHP/Laravel, bots, automation and systems tooling.",
      image: require("./assets/images/codeHighlight.svg"),
      imageAlt: "Multi stack development",
      footerLink: [
        {name: "GitHub Profile", url: "https://github.com/windymaster009"}
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
  subtitle: "Feel free to download my resume",
  display: false
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Want to discuss software, automation, a project or an opportunity? Reach out through my GitHub profile.",
  number: "",
  email_address: ""
};

const twitterDetails = {
  userName: "",
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
