import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";

import { getProjects } from "../api/userApi";

import "../styles/Home.css";

export default function Home() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getProjects();
    setProjects(res.data);
  };

  return (
    <div>

      <Navbar />

      <section className="hero">
        <h1>Download Ready Made Projects</h1>

        <p>
          Academic | Mini | Major | Final Year Projects
        </p>

        <button className="browse-btn">
          Browse Projects
        </button>
      </section>

      <section className="features">

        <div className="box">
          Instant Download
        </div>

        <div className="box">
          Secure Payment
        </div>

        <div className="box">
          Source Code + Report
        </div>

      </section>

      <section className="project-list">

        <h2>Latest Projects</h2>

        <div className="grid">

          {projects.map(p => (
            <ProjectCard
              key={p.projectId}
              project={p}
            />
          ))}

        </div>

      </section>

      <Footer />

    </div>
  );
}
