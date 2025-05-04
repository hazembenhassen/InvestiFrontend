import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "./adminProjectManagement.scss";

interface Project {
  id: number;
  project_name: string;
  project_description: string;
  project_status: string;
  userId: number;
  imageData?: string; 
}

interface Comment {
  id: number;
  comment: string;
  createdAt: string;
  username: string;
}

interface Update {
  id: number;
  update: string;
  createdAt: string;
}

const AdminProjectManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [selectedProjectData, setSelectedProjectData] = useState<Project | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [updates, setUpdates] = useState<Update[]>([]);

  const token = localStorage.getItem("authToken");

  const fetchProjects = async () => {
    const response = await axios.get("http://localhost:8082/api/projects", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProjects(response.data);
  };

  const fetchProjectData = async (projectId: number) => {
    const response = await axios.get(`http://localhost:8082/api/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSelectedProjectData(response.data);
  };

  const fetchComments = async (projectId: number) => {
    const response = await axios.get(
      `http://localhost:8082/api/projects/${projectId}/comments`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setComments(response.data);
  };

  const fetchUpdates = async (projectId: number) => {
    const response = await axios.get(
      `http://localhost:8082/api/projects/${projectId}/updates`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUpdates(response.data);
  };

  const viewDetails = async (projectId: number) => {
    setSelectedProjectId(projectId);
    await fetchProjectData(projectId);
    await fetchComments(projectId);
    await fetchUpdates(projectId);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="admin-project-management">
      <AdminNavbar />
      <h2>Project Management</h2>

      {/* Show project list only if no project is selected */}
      {!selectedProjectId && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.project_name}</td>
                <td>{p.project_description}</td>
                <td>{p.project_status}</td>
                <td>{p.userId}</td>
                <td>
                  <button onClick={() => viewDetails(p.id)}>👁 View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Show details if a project is selected */}
      {selectedProjectId && selectedProjectData && (
  <div className="project-details">
    <button className="back-btn" onClick={() => setSelectedProjectId(null)}>← Back to List</button>
    <div className="project-card">
      {selectedProjectData.imageData && (
        <img
          className="project-image"
          src={selectedProjectData.imageData}
          alt="Project"
        />
      )}
      <div className="project-info">
        <h3>{selectedProjectData.project_name}</h3>
        <p><strong>ID:</strong> {selectedProjectData.id}</p>
        <p><strong>Status:</strong> {selectedProjectData.project_status}</p>
        <p><strong>Owner (User ID):</strong> {selectedProjectData.userId}</p>
        <p><strong>Description:</strong> {selectedProjectData.project_description}</p>
      </div>
    </div>

    <div className="details-section">
      <div className="updates">
        <h4>Updates</h4>
        {updates.length > 0 ? (
          <ul>
            {updates.map((u) => (
              <li key={u.id}>
                <strong>{new Date(u.createdAt).toLocaleString()}</strong>: {u.update}
              </li>
            ))}
          </ul>
        ) : (
          <p>No updates found.</p>
        )}
      </div>

      <div className="comments">
        <h4>Comments</h4>
        {comments.length > 0 ? (
          <ul>
            {comments.map((c) => (
              <li key={c.id}>
                <strong>{c.username}</strong> ({new Date(c.createdAt).toLocaleString()}):{" "}
                {c.comment}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments found.</p>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AdminProjectManagement;
