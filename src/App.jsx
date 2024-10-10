import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  const handleCreateProject = () => {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  };

  function handleSubmitProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });

    console.log(projectsState);
  }

  function handleCancelSaveProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleProjectSelect(projectId) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: projectId,
      };
    });
  }

  function handleProjectDelete(projectId) {
    alert("deleting: " + projectId);
  }

  //console.log("Projects state ", projectsState);

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content;

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onSubmit={handleSubmitProject}
        onCancel={handleCancelSaveProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onCreateProject={handleCreateProject} />;
  } else if (
    projectsState.selectedProjectId &&
    projectsState.selectedProjectId > 0
  ) {
    content = (
      <SelectedProject
        project={selectedProject}
        onDeleteProject={handleProjectDelete}
      />
    );
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onCreateProject={handleCreateProject}
        onSelectProject={handleProjectSelect}
        projects={projectsState.projects}
      />
      {content}
    </main>
  );
}

export default App;
