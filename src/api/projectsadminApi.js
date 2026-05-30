
import axios from "./axiosConfig";

/* ===== GET ALL PROJECTS ===== */

export const getAllProjectsAdmin =
  async () => {

    const res =
      await axios.get(
        "/api/admin/projects"
      );

    return res.data;
  };

/* ===== GET PROJECT BY ID ===== */

export const getProjectByIdAdmin =
  async (projectId) => {

    const res =
      await axios.get(
        `/api/admin/projects/${projectId}`
      );

    return res.data;
  };

/* ===== ADD PROJECT ===== */

export const addProject =
  async (projectData) => {

    const res =
      await axios.post(
        "/api/admin/projects",
        projectData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return res.data;
  };

/* ===== UPDATE PROJECT ===== */

export const updateProject =
  async (
    projectId,
    projectData
  ) => {

    const res =
      await axios.put(
        `/api/admin/projects/${projectId}`,
        projectData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return res.data;
  };

/* ===== DELETE PROJECT ===== */

export const deleteProject =
  async (projectId) => {

    const res =
      await axios.delete(
        `/api/admin/projects/${projectId}`
      );

    return res.data;
  };

