import { motion } from "motion/react";
import PageLayout from "@layouts/PageLayout";

import logo from "@static/image/logo.jpg";
import { Link } from "react-router";

import { Mail, Phone, ExternalLink } from "lucide-react";

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
          <header className="border-b border-border">
            <h1>{title}</h1>
          </header>
          <div>
            <p>
              Tôi là Tuấn, và tôi chia sẻ những điều mình cho rằng nó là thú vị,
              hay giúp ích cho bạn!
              <br />
              <img
                className="float-right ml-6 mb-4 w-40 h-40 rounded-full object-cover"
                src={logo}
                alt="Tuấn"
              />
              <br />
              Tôi làm quen với máy tính bắt đầu vào năm 2007, khi vào Đại học.
              Các trang web là niềm say mê của tôi, bắt đầu bằng Yahoo Blog.
            </p>
            <p>
              Tôi học CNTT và trải qua nhiều môn học từ cách cài đặt windows xp,
              đến viết phần mềm cho máy tính, hay&nbsp;
              <Link
                title="Thiết kế website"
                to="https://tuanitpro.com/thiet-ke-website-da-lat"
                rel="tooltip"
              >
                thiết kế trang web
              </Link>
              &nbsp;đơn giản với HTML &amp; Css + Javascript. Tôi thiết kế, lập
              trình cùng lúc nhiều ngôn ngữ như PHP,&nbsp;
              <Link title="ASP.NET" to="https://tuanitpro.com/category/asp-net">
                ASP.NET
              </Link>
              , Java, NodeJs, NestJS, ReactJs, NextJS
            </p>
            <p>
              Tôi có các kỹ năng cần thiết để làm việc hiệu quả và có thể giúp
              đỡ người khác.
            </p>
            <p>—</p>
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
                title: "2. System Architecture:",
                items: [
                  "Scalability and Performance: Ability to design systems that are scalable and performant, understanding when to optimize code and infrastructure.",
                  "Microservices: Experience in breaking down monolithic applications into microservices for better modularity and scalability.",
                  "Security: Understanding of security best practices for both frontend (authentication, authorization) and backend (data protection, encryption).",
                ],
              },
              {
                title: "3. Leadership and Collaboration:",
                items: [
                  "Mentorship: Guiding and mentoring junior engineers, promoting knowledge sharing within the team.",
                  "Collaboration: Working closely with other stakeholders such as Product Managers, UX/UI Designers, and QA Engineers to ensure smooth project execution.",
                  "Code Reviews: Leading code reviews, ensuring high-quality code is maintained across the team.",
                ],
              },
              {
                title: "4. Problem-Solving and Innovation:",
                items: [
                  "Troubleshooting: Strong debugging and problem-solving skills, capable of addressing complex issues in both the frontend and backend.",
                  "Innovation: Continuously exploring new tools, technologies, and approaches to improve efficiency and code quality.",
                ],
              },
              {
                title: "5. Project Management:",
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
              >
                <h3>{section.title}</h3>
                <ul>
                  {section.items.map((item, i) => (
                    <li key={i}>
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
            <p>
              … và một số chủ đề khác.&nbsp;
              <Link to="http://cv.tuanitpro.com/">Nhiều hơn về tôi?</Link>
            </p>
            <h2>Tôi có thể làm được gì giúp bạn?</h2>
            <p>
              Chiếc máy tính của bạn không hoạt động, bị virut,.. Hãy gọi tôi.
            </p>
            <p>
              Bạn là người yêu thích lập trình, thích khám phá thế giới lập
              trình, bạn chưa biết bắt đầu từ đâu? Tôi có thể giúp bạn.
            </p>
            <p>
              Bạn muốn tự tay thiết kế, lập trình một website, hay phần mềm? Bạn
              có thể làm được. Tôi sẽ giúp bạn.
            </p>
            <p>
              Bạn cần một phần mềm quản lý lĩnh vực của bạn. Tôi có thể làm
              được.
            </p>
            <p>
              Bạn cần một ứng dụng Android cho điện thoại của bạn. Tôi có thể
              làm được.
            </p>
            <p>
              Bạn cần thiết kế website chuyên nghiệp, phần mềm quản lý, ứng dụng
              di động.., chất lượng và hiệu quả? Hãy gọi tôi.
            </p>
            <p>
              Bạn là người kinh doanh, người làm du lịch, làm quản lý…., hay cá
              nhân, bạn cần&nbsp;
              <Link
                title="Thiết kế website"
                to="https://tuanitpro.com/thiet-ke-website-da-lat"
                rel="tooltip"
              >
                thiết kế một website
              </Link>
              , phần mềm di động, phần mềm ứng dụng…&nbsp;phục vụ mục đích nào
              đó của bạn. Tôi có thể làm được
            </p>
            <p>
              Đơn giản bạn yêu thích lập trình, yêu thích CNTT, và bạn cần giúp
              đỡ. Tôi có thể làm được.
              <br />
              <br />
              Nếu bạn cần nhiều thông tin hơn về tôi, theo dõi tôi trên&nbsp;
              <br />
              <Link
                title="Lê Thanh Tuấn on Twitter"
                to="https://x.com/tuanitpro"
                target="_blank"
                rel="tooltip noopener noreferrer"
                className="inline-flex items-center gap-1"
              >
                <ExternalLink size={14} /> Twitter
              </Link>
              &nbsp;,&nbsp;
              <Link
                title="Lê Thanh Tuấn on Facebook"
                to="https://facebook.com/tuanitpro"
                target="_blank"
                rel="tooltip noopener noreferrer"
                className="inline-flex items-center gap-1"
              >
                <ExternalLink size={14} /> Facebook
              </Link>
              &nbsp;hoặc&nbsp;
              <Link
                title="Lê Thanh Tuấn on Google +"
                to="https://www.linkedin.com/in/tuanitpro/"
                target="_blank"
                rel="tooltip noopener noreferrer"
                className="inline-flex items-center gap-1"
              >
                <ExternalLink size={14} /> LinkedIn
              </Link>
            </p>
            <Link title="Liên hệ" to="/contact" rel="tooltip">
              Liên hệ
            </Link>
            &nbsp;với tôi qua email:&nbsp;
            <span className="inline-flex items-center gap-1">
              <Mail size={14} /> tuanitpro@gmail.com
            </span>
            &nbsp;hoặc:&nbsp;
            <span className="inline-flex items-center gap-1">
              <Phone size={14} /> 097 6060 432
            </span>
          </div>
        </article>
      </PageLayout>
    </motion.div>
  );
};

export default About;
