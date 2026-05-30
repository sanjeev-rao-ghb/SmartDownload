
import { useEffect, useState } from "react";



import {
  getAllProjects,
} from "../../api/projectApi";

import "../../styles/navbaradmin1.css";
import "../../styles/projectsAdmin.css";



export default function ProjectsAdmin() {

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    loadProjects();

  }, []);

  const loadProjects =
    async () => {

      try {

        const data =
          await getAllProjects();

        setProjects(data);

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);
      }
    };

  const filteredProjects =
    projects.filter((p) =>

      p.title
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  if (loading)
    return <h2>Loading...</h2>;

  return (

    <>
     

      <div className="page-container">

        <h1>
          Admin Projects
        </h1>

        <div className="search-container">

          <input
            className="search-input"

            type="text"

            placeholder="Search projects..."

            value={search}

            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <div className="project-grid">

          {filteredProjects.map((p) => (

            <div
              key={p.projectId}
              className="project-card"
            >

              <img
                src={`http://localhost:8082/api/projects/image/${p.projectId}`}

                className="project-img"

                alt="project"
              />

              <h3>
                {p.title}
              </h3>

              <p>
                {p.description}
              </p>

              <p className="price">
                ₹{p.price}
              </p>

              <p className="admin-msg">
                Admin View Only
              </p>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

