import PageLayout from "@layouts/PageLayout";

import logo from "@static/image/logo.jpg";
import { Link } from "react-router";
import IonIcon from "@reacticons/ionicons";
const About = () => {
  const title = "Về tôi";
  return (
    <PageLayout title={title}>
      <article className="hentry">
        <div className="entry-content">
          <h1>{title}</h1>
          <div>
            <p>
              Tôi là Tuấn, và tôi chia sẻ những điều mình cho rằng nó là thú vị,
              hay giúp ích cho bạn!
              <br />
              <img
                className="size-full  alignright"
                src={logo}
                alt="Tuấn"
                width="160"
                height="160"
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
              , Java
            </p>
            <p>
              Tôi có các kỹ năng cần thiết để làm việc hiệu quả và có thể giúp
              đỡ người khác.
            </p>
            <p>—</p>
            <div className="markdown-heading" dir="auto">
              <h3 className="heading-element" dir="auto">
                1. Technical Expertise:
              </h3>
            </div>
            <ul dir="auto">
              <li>
                <p dir="auto">
                  Frontend Proficiency: Deep knowledge of frontend technologies
                  like HTML, CSS, JavaScript, and frameworks such as React and
                  Vue.js.
                </p>
              </li>
              <li>
                <p dir="auto">
                  Backend Development: Experience in backend technologies like
                  Node.js, C#, ADO.NET NET Core, MVC, LINQ, Entity Framework,
                  Dapper, WebServices, RESTful API, IdentityServer4, RabbitMQ,
                  Redis, NodeJS, NestJS. Knowledge of some well-known Unit Test
                  with xUnit, NSubtitue. (The art of unit testing)
                </p>
              </li>
              <li>
                <p dir="auto">
                  Mobile app Development: Ability to work in the area of mobile
                  app development with platform: Android (Google Play), iOS (App
                  Store) React Native, Flutter..
                </p>
              </li>
              <li>
                <p dir="auto">
                  Database Management: Familiarity with both relational (SQL)
                  and non-relational (NoSQL) databases like SQL Server,
                  PostgreSQL, MySQL, MongoDB.
                </p>
              </li>
              <li>
                <p dir="auto">
                  API Design: Expertise in designing and developing RESTful or
                  GraphQL APIs.
                </p>
              </li>
              <li>
                <p dir="auto">
                  Cloud Services: Familiarity with cloud platforms like AWS,
                  Azure and experience with deploying applications on these
                  platforms.
                </p>
              </li>
              <li>
                <p dir="auto">
                  DevOps Knowledge: Familiarity with CI/CD pipelines,
                  containerization (Docker), and orchestration tools like
                  Kubernetes. ArgoCD, k8s Terraform (AWS, Azure), Docker,
                  Jenkins, Gitlab CI, GitHub Action…
                </p>
              </li>
            </ul>
            <div className="markdown-heading" dir="auto">
              <h3 className="heading-element" dir="auto">
                2. System Architecture:
              </h3>
            </div>
            <ul dir="auto">
              <li>
                <p dir="auto">
                  Scalability and Performance: Ability to design systems that
                  are scalable and performant, understanding when to optimize
                  code and infrastructure.
                </p>
              </li>
              <li>
                <p dir="auto">
                  Microservices: Experience in breaking down monolithic
                  applications into microservices for better modularity and
                  scalability.
                </p>
              </li>
              <li>
                <p dir="auto">
                  Security: Understanding of security best practices for both
                  frontend (authentication, authorization) and backend (data
                  protection, encryption).
                </p>
              </li>
            </ul>
            <div className="markdown-heading" dir="auto">
              <h3 className="heading-element" dir="auto">
                3. Leadership and Collaboration:
              </h3>
            </div>
            <ul dir="auto">
              <li>
                <p dir="auto">
                  Mentorship: Guiding and mentoring junior engineers, promoting
                  knowledge sharing within the team.
                </p>
              </li>
              <li>
                <p dir="auto">
                  Collaboration: Working closely with other stakeholders such as
                  Product Managers, UX/UI Designers, and QA Engineers to ensure
                  smooth project execution.
                </p>
              </li>
              <li>
                <p dir="auto">
                  Code Reviews: Leading code reviews, ensuring high-quality code
                  is maintained across the team.
                </p>
              </li>
            </ul>
            <div className="markdown-heading" dir="auto">
              <h3 className="heading-element" dir="auto">
                4. Problem-Solving and Innovation:
              </h3>
            </div>
            <ul dir="auto">
              <li>
                <p dir="auto">
                  Troubleshooting: Strong debugging and problem-solving skills,
                  capable of addressing complex issues in both the frontend and
                  backend.
                </p>
              </li>
              <li>
                <p dir="auto">
                  Innovation: Continuously exploring new tools, technologies,
                  and approaches to improve efficiency and code quality.
                </p>
              </li>
            </ul>
            <div className="markdown-heading" dir="auto">
              <h3 className="heading-element" dir="auto">
                5. Project Management:
              </h3>
            </div>
            <ul dir="auto">
              <li>
                <p dir="auto">
                  Agile/Scrum: Familiarity with Agile methodologies, able to
                  manage sprints, and track progress through tools like Jira or
                  Trello.
                </p>
              </li>
              <li>
                <p dir="auto">
                  Time Management: Balancing multiple projects, prioritizing
                  tasks effectively, and delivering on deadlines.
                </p>
              </li>
            </ul>
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
              >
                <IonIcon name="logo-twitter" /> Twitter
              </Link>
              &nbsp;,&nbsp;
              <Link
                title="Lê Thanh Tuấn on Facebook"
                to="https://facebook.com/tuanitpro"
                target="_blank"
                rel="tooltip noopener noreferrer"
              >
                <IonIcon name="logo-facebook" /> Facebook
              </Link>
              &nbsp;hoặc&nbsp;
              <Link
                title="Lê Thanh Tuấn on Google +"
                to="https://www.linkedin.com/in/tuanitpro/"
                target="_blank"
                rel="tooltip noopener noreferrer"
              >
                <IonIcon name="logo-linkedin" /> LinkedIn
              </Link>
            </p>
            <Link title="Liên hệ" to="/contact" rel="tooltip">
              Liên hệ
            </Link>
            &nbsp;với tôi qua email:&nbsp;
            <IonIcon name="mail" />
            tuanitpro@gmail.com &nbsp;hoặc:&nbsp;
            <IonIcon name="call" />
            097 6060 432
          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default About;
