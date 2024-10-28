import { useState } from "react";
import { StartingPage } from "./Components/StartingPage";
import { Sidebar } from "./Components/Sidebar";
import { Task } from "./Components/Task";
import { SelectedProject } from "./Components/selectedProject";
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
  let display = (
    <SelectedProject
      project={projectSelected}
      onDelete={handleDelete}
      onAddTask={handleAddTask}
      onADeleteTask={handleDeleteTask}
      tasks={displayPage.tasks}
    ></SelectedProject>
  );
  if (displayPage.id === "empty") {
    display = <StartingPage onSet={newProject}></StartingPage>;
  } else if (displayPage.id === "new") {
    display = <Task onAdd={newProjectAdded} onCancel={projectCancel}></Task>;
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
  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onSet={newProject}
        list={displayPage.projects}
        onSelect={handleProjectSelection}
        selectedProjectId={displayPage.id}
      ></Sidebar>
      {display}
    </main>
  );
}

export default App;
