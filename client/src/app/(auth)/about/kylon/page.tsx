import React from "react";
import styles from "./KylonPage.module.scss";
import ContactForm from "./ContactForm";
import Chat from "@/components/chat/Chat";

const skills: string[] = [
  "Angular 15+",
  "React.js",
  "Next.js",
  "Vue",
  "Svelte",
  "TypeScript",
  "JavaScript (ES6+)",
  "CSS3",
  "SCSS/SASS",
  "Responsive Design",
  "WebGL",
  "Chakra UI",
  "Microfrontend Architecture",
  "NgRx",
  "Redux Toolkit",
  "RxJS",
  "Node.js",
  "Express.js",
  "Java",
  "Spring Boot",
  "REST APIs",
  "GraphQL",
  "Microservices Design",
  "SQL",
  "RDBMS",
  "MongoDB",
  "CI/CD & Deployment Automation",
  "Jenkins",
  "Docker",
  "Blue-Green Deployments",
  "Canary Deployments",
  "Multi-Environment Staging",
  "Webpack",
  "Unit Testing: Jest",
  "Unit Testing: Jasmine",
  "Unit Testing: Karma",
  "End-to-End Testing: Playwright",
  "End-to-End Testing: Cypress",
  "TDD",
  "SOLID Principles",
  "Accessibility Improvements",
  "AI / ML / LLM",
  "Postman",
  "Swagger",
  "Mentorship & Team Development",
  "Software Architecture",
  "Performance Optimization",
];

const experience = [
  {
    company: "Edward Jones (CGI Client)",
    title: "Software Engineer III",
    duration: "2022 - 2025",
    description: [
      "Delivered high-quality, reliable front-end features across multiple Micro Frontends.",
      "Guided feature design and architectural discussions.",
      "Managed front-end code standardization across multiple teams.",
      "Collaborated with other teams, designers, PMs, and stakeholders to deliver features.",
      "Improved accessibility and screen-reader performance for a core feature, enhancing usability for all users.",
    ],
  },
  {
    company: "CGI",
    title: "Senior Consultant, Senior Software Engineer",
    duration: "2022 - 2025",
    description: [
      "Served as a trusted technical advisor to client teams, providing guidance on best practices and development approaches.",
      "Supported client development teams by contributing to the implementation and delivery of front-end solutions.",
      "Coordinated task priorities and workflows within client projects to ensure timely delivery of assigned responsibilities.",
      "Worked closely with clients daily, integrating seamlessly into their development teams and facilitating effective cross-functional communication.",
      "Enhanced client team efficiency by sharing knowledge, recommending practices, and providing feedback on development processes.",
    ],
  },
  {
    company: "Follett School Solutions",
    title: "Associate Software Engineer",
    duration: "2017 - 2022",
    description: [
      "Migrated a legacy AngularJS mobile web app to Angular, improving maintainability and usability.",
      "Served as one of two lead developers on the migration, guiding feature implementation and design decisions.",
      "Maintained code quality and reduced technical debt through reviews and best practices.",
      "Worked with a 10-15 member cross-functional team, documenting and aligning feature designs.",
      "Improved usability and accessibility of the mobile web app during the migration.",
    ],
  },
];

export default function KylonPage() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2>About Me</h2>
          <p>
            Hi! I&apos;m Kylon, a Senior Front-End Engineer with almost{" "}
            <strong>8 years of experience</strong> building scalable and
            user-centric web applications. I specialize in Angular and
            TypeScript, but I&apos;m comfortable with any front-end framework. I
            have a passion for crafting seamless, accessible, and
            high-performance user experiences.
          </p>
          <p>
            When I&apos;m not coding, I enjoy mentoring junior engineers,
            exploring emerging technologies like AI and machine learning, and
            continuously improving my craft.
          </p>
          <p>
            Be sure to talk to <a href="#yori">Yori</a> if you have any
            questions!
          </p>
        </section>

        <section className={styles.section}>
          <h2>Skills</h2>
          <div className={styles.skills}>
            {skills.map((skill) => (
              <span key={skill} className={styles.skill}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className={styles.section} id="experience">
          <h2>Experience</h2>
          {experience.map((exp, idx) => (
            <div key={idx} className={styles.experienceItem}>
              <strong>{exp.company}</strong> {exp.title && `- ${exp.title}`}{" "}
              <em>({exp.duration})</em>
              <ul>
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className={styles.section} id="yori">
          <Chat initialMessage="I can answer any questions you have about Kylon's experience" />
        </section>

        <section className={styles.section}>
          <h2 style={{ display: "flex", justifyContent: "space-between" }}>
            Want to Hire Me?{" "}
            <a
              href="https://www.linkedin.com/in/kylon-tyner/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkedinLink}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                height="24px"
                width="24px"
                version="1.1"
                id="Layer_1"
                viewBox="0 0 382 382"
                xmlSpace="preserve"
              >
                <path
                  fill="currentColor"
                  d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889  C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056  H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806  c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1  s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73  c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079  c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426  c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472  L341.91,330.654L341.91,330.654z"
                />
              </svg>{" "}
              Connect with me on LinkedIn
            </a>
          </h2>{" "}
          <ContactForm />
        </section>
      </main>
    </div>
  );
}
