import React from 'react';
export default function About() {

  return (
    <div className="about-container">
      <h1>About Me</h1>
      <div className="profile-picture">
        <img src="https://picsum.photos/200/300?grayscale" alt="Profile Picture" />
      </div>
      <div className="bio">
        <p>Hello! I'm Tolu, a Junior Full Stack Developer with a passion for creating dynamic and user-friendly web applications.</p>
        <p>I'm excited to share my story with you and showcase my skills and experiences.</p>
      </div>
      <div className="skills">
        <h2>Skills</h2>
        <ul>
          <li>JavaScript</li>
          <li>React</li>
          <li>Node.js</li>
          <li>MongoDB</li>
          <li>Express.js</li>
          <li>EJS</li>
          <li>CSS</li>
          <li>HTML</li>
        </ul>
      </div>
      
      <div className="education">
        <h2>Education</h2>
        <ul>
          <li>
            <h3>Computer Science</h3>
            <p>Covenant University</p>
            <p>August 2024</p>
          </li>
        </ul>
      </div>
      <div className="contact">
        <h2>Get in Touch</h2>
        <ul>
          <li>
            <a href="mailto:toluomoniyi24@gmail.com">
              <i className="fas fa-envelope" />
              toluomoniyi24@gmail.com
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/omoniyi-tolulope]">
              <i className="fab fa-linkedin" />
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://github.com/CUTolu2021">
              <i className="fab fa-github" />
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
