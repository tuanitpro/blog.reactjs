import { motion } from "motion/react";
import PageLayout from "@layouts/PageLayout";

import logo from "@static/image/logo.jpg";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const About = () => {
  const title = "Về tôi";
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <PageLayout title={title}>
        <article className="prose dark:prose-invert max-w-none">
          <header className="mb-8 not-prose">
            <span className="micro-label text-accent mb-2 block">About Me</span>
            <h1 className="text-5xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-display leading-[0.85] italic">
              PASSION &<br />EXPERTISE
            </h1>
            <div className="h-1 w-24 bg-accent mt-6" />
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
            <div className="relative">
              <img
                className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-sm"
                src={logo}
                alt="Tuấn"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 -z-10" />
            </div>
            <div>
              <p className="text-xl font-medium leading-relaxed italic text-foreground/80 mb-6">
                Tôi là Tuấn, và tôi chia sẻ những điều mình cho rằng nó là thú vị,
                hay giúp ích cho bạn!
              </p>
              <p className="text-lg leading-relaxed text-foreground/60">
                Tôi làm quen với máy tính bắt đầu vào năm 2007, khi vào Đại học.
                Các trang web là niềm say mê của tôi, bắt đầu bằng Yahoo Blog.
                Tôi học CNTT và trải qua nhiều môn học từ cách cài đặt windows xp,
                đến viết phần mềm cho máy tính, hay thiết kế trang web đơn giản với HTML & Css + Javascript.
              </p>
            </div>
          </div>

          <div className="space-y-10">
            {[
              {
                title: "1. Technical Expertise:",
                items: [
                  "Frontend Proficiency: Deep knowledge of frontend technologies like HTML, CSS, JavaScript, and frameworks such as React, NextJS and Vue.js.",
                  "Backend Development: Experience in backend technologies like Node.js, C#, ADO.NET NET Core, MVC, LINQ, Entity Framework, Dapper, WebServices, RESTful API, IdentityServer4, RabbitMQ, Redis, NextJS, NestJS. Knowledge of some well-known Unit Test with xUnit, NSubtitue. (The art of unit testing)",
                  "Mobile app Development: Ability to work in the area of mobile app development with platform: Android (Google Play), iOS (App Store) React Native, Flutter.",
                  "Database Management: Familiarity with both relational (SQL) and non-relational (NoSQL) databases like SQL Server, PostgreSQL, MySQL, MongoDB.",
                  "API Design: Expertise in designing and developing RESTful or GraphQL APIs.",
                  "Cloud Services: Familiarity with cloud platforms like AWS, Azure and experience with deploying applications on these platforms.",
                  "DevOps Knowledge: Familiarity with CI/CD pipelines, containerization (Docker), and orchestration tools like Kubernetes. ArgoCD, k8s Terraform (AWS, Azure), Docker, Jenkins, Gitlab CI, GitHub Action…",
                  "AI-Powered Development: Experienced in leveraging AI tools to accelerate and enhance the development workflow — including Claude AI, Google Gemini, and GitHub Copilot for intelligent code completion, review, and generation.",
                  "AI Chatbot Development: Capable of designing and building conversational AI chatbots, integrating large language models into real-world applications to deliver smart, context-aware user experiences.",
                  "AI Workflow Orchestration: Proficient with Langflow for visually composing and managing AI pipelines and chatbot servers, enabling rapid prototyping of complex LLM-driven workflows without deep infrastructure overhead.",
                  "AI Content Generation Systems: Skilled in building automated content writer systems powered by AI — combining prompt engineering, model APIs, and workflow automation to produce high-quality, structured content at scale.",
                ],
              },
              {
                title: "02. System Architecture",
                items: [
                  "Scalability and Performance: Ability to design systems that are scalable and performant.",
                  "Microservices: Experience in breaking down monolithic applications into microservices.",
                  "Security: Understanding of security best practices for both frontend and backend.",
                ],
              },
              {
                title: "03. Leadership and Collaboration",
                items: [
                  "Mentorship: Guiding and mentoring junior engineers, promoting knowledge sharing within the team.",
                  "Collaboration: Working closely with other stakeholders such as Product Managers, UX/UI Designers, and QA Engineers to ensure smooth project execution.",
                  "Code Reviews: Leading code reviews, ensuring high-quality code is maintained across the team.",
                ],
              },
              {
                title: "04. Problem-Solving and Innovation",
                items: [
                  "Troubleshooting: Strong debugging and problem-solving skills, capable of addressing complex issues in both the frontend and backend.",
                  "Innovation: Continuously exploring new tools, technologies, and approaches to improve efficiency and code quality.",
                ],
              },
              {
                title: "05. Project Management",
                items: [
                  "Agile/Scrum: Familiarity with Agile methodologies, able to manage sprints, and track progress through tools like Jira or Trello.",
                  "Time Management: Balancing multiple projects, prioritizing tasks effectively, and delivering on deadlines.",
                ],
              },
            ].map((section) => (
              <motion.div
                key={section.title}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="border-t border-border/30 pt-6"
              >
                <h3 className="text-display text-3xl mb-2 italic">{section.title}</h3>
                <ul className="grid grid-cols-1 gap-1 list-none p-0">
                  {section.items.map((item, i) => (
                    <li key={i} className="group">
                      <p className="text-foreground/60 group-hover:text-foreground transition-colors duration-300 leading-relaxed">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </article>
      </PageLayout>
    </motion.div>
  );
};

export default About;
