import { createContext } from "react";
export const Manage = createContext({
  id: "",
  projects: [],
  tasks: [],
  AddProject: () => {},
  SelectProject: () => {},
  DeleteProject: () => {},
  AddTask: () => {},
  CancelProject: () => {},
  AddNewProject: () => {},
  DeleteTask: () => {},
});
