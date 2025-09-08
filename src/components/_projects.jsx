import ReactMarkdown from "react-markdown";

export default function Projects({ data }) {
  return (
    <section id="projects" className="projects">
      <div className="projects-title">
        <h1>{data.title}</h1>
      </div>
      <div className="projects-container">
        {data.list.map((project, i) => (
          <div key={i} className="project">
            <img
              className="project-image no-theme-filter"
              src={project.src}
              alt={project.alt}
            />
            <div className="project-details">
              <h2 className="project-details-title">{project.title}</h2>
              <p className="project-details-description">
                <ReactMarkdown
                  components={{
                    a: ({ node, ...props }) => (
                      <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "inherit" }}
                      />
                    ),
                  }}
                >
                  {project.description}
                </ReactMarkdown>
              </p>
              <a
                className="project-details-button"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Code Source
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}