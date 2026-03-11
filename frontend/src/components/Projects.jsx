import React from 'react';
import './Projects.css';
import atten from "../assets/atten.png";
import url from "../assets/url.png";
import hill from "../assets/hill.png";
import sanjeevini from "../assets/sanjeevini.png";

const projects = [
  // {
  //   title: "Netflix UI Clone",
  //   description: "A high-fidelity Netflix landing page featuring dynamic rows and a mobile-first responsive design.",
  //   image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop", 
  //   tech: ["React", "CSS"],
  //   github: "https://github.com/yourusername/netflix-clone"
  // },
  {
    title: "Project URL Shortener",
    description: "A full-stack tool that generates micro-links with click analytics and custom slugs.",
    image: url,
    tech: ["Node.js", "Express", "MongoDB"],
    github: "https://github.com/Vibhay007/url-shortner"
  },
  {
    title: "Hill Connect",
    description: "Community platform connecting remote hilly regions with emergency services and local updates.",
    image: hill,
    tech: ["MERN Stack"],
    github: "https://github.com/Vibhay007/hillconnect.git"

  },
  {
     title: "Attendify",
    description:" A College Attendance Management App that digitalizes attendance tracking, improves accuracy, and simplifies record management for both faculty and students.",
    image:atten,
    tech: ["MERN Stack"],
    github: "https://github.com/Vibhay007/attendance-frontend.git"
  },
  {
    title: "Sanjeevni X",
    description: "Sanjeevini X is an innovative platform designed to simplify healthcare access by connecting users with essential medical services, information, and support. The project focuses on improving accessibility, efficiency, and digital healthcare solutions through modern technology.",
    image: sanjeevini,
    tech: ["MERN Stack"],
    github: "https://github.com/Vibhay007/sanjeevini-X.git"

  }
];

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <div className="projects-header">
        <h2 className="section-title"> <span>Projects</span></h2>
        <div className="underline"></div>
      </div>

      <div className="projects-container">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <a href={project.github} target="_blank" rel="noreferrer" className="view-btn">
                  View Code
                </a>
              </div>
            </div>
            
            <div className="project-content">
              <div className="tech-stack">
                {project.tech.map((t, i) => (
                  <span key={i} className="tech-tag">{t}</span>
                ))}
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* GitHub Call-to-Action Section
   <div className="github-cta">
        <div className="cta-content">
          <h3>Want to see more?</h3>
          <p>I regularly push new features and experimental MERN projects to my GitHub.</p>
        </div>
        <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="github-btn">
          <i className="ri-github-fill"></i> View My GitHub
        </a>
      </div> */}
    </section>
  );
};

export default Projects;