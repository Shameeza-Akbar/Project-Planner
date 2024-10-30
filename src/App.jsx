import { useState } from "react";
import { StartingPage } from "./Components/StartingPage";
import { Sidebar } from "./Components/Sidebar";
import { Task } from "./Components/Task";
import { SelectedProject } from "./Components/selectedProject";
import { Manage } from "./store/Allfunctions";
function App() {
  const [displayPage, setDisplayPage] = useState({
    id: "empty",
    projects: [],
    tasks: [],
  });
  function newProject() {
    setDisplayPage((prevState) => {
      return { ...prevState, id: "new", projects: [...prevState.projects] };
    });
  }
  const projectSelected = displayPage.projects.find(
    (project) => project.id === displayPage.id
  );
  function handleDelete() {
    setDisplayPage((prevState) => {
      return {
        ...prevState,
        id: "empty",
        projects: prevState.projects.filter(
          (project) => project.id !== displayPage.id
        ),
      };
    });
  }
  let display = <SelectedProject project={projectSelected} />;
  if (displayPage.id === "empty") {
    display = <StartingPage />;
  } else if (displayPage.id === "new") {
    display = <Task />;
  }
  function newProjectAdded(arr) {
    setDisplayPage((prevState) => {
      const project = { ...arr, id: Math.random() };
      return {
        ...prevState,
        id: "empty",
        projects: [...prevState.projects, project],
      };
    });
  }
  function projectCancel() {
    setDisplayPage((prevState) => {
      return {
        ...prevState,
        id: "empty",
      };
    });
  }
  function handleProjectSelection(ID) {
    setDisplayPage((prevState) => {
      return {
        ...prevState,
        id: ID,
      };
    });
  }
  function handleAddTask(text) {
    setDisplayPage((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        id: taskId,
        projectId: prevState.id,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }
  function handleDeleteTask(id) {
    setDisplayPage((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== id),
      };
    });
  }
  const CtxValue = {
    id: displayPage.id,
    projects: displayPage.projects,
    tasks: displayPage.tasks,
    AddProject: newProject,
    SelectProject: handleProjectSelection,
    DeleteProject: handleDelete,
    AddTask: handleAddTask,
    DeleteTask: handleDeleteTask,
    CancelProject: projectCancel,
    AddNewProject: newProjectAdded,
  };
  return (
    <Manage.Provider value={CtxValue}>
      <main className="h-screen my-8 flex gap-8">
        <Sidebar />
        {display}
      </main>
    </Manage.Provider>
  );
}

export default App;
