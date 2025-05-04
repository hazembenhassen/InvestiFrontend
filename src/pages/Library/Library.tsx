import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const Library: React.FC = () => {
  return (
    <div className="library">
        <Navbar/>
        <Sidebar/>
        <ProjectCard/>
    </div>
  );
};

export default Library;
