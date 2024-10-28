import { Alert } from "./Alert";
import { Inputs } from "./Inputs";
import { useRef } from "react";
export const Task = ({ onAdd, onCancel }) => {
  const alert = useRef();
  const newTitle = useRef();
  const newDescription = useRef();
  const newDueDate = useRef();
  function save() {
    const titleAdded = newTitle.current.value;
    const DescriptionAdded = newDescription.current.value;
    const dueDateAdded = newDueDate.current.value;
    if (
      titleAdded.trim() === "" ||
      DescriptionAdded.trim() === "" ||
      dueDateAdded.trim() === ""
    ) {
      alert.current.open();
      return;
    }
    onAdd({
      Title: titleAdded,
      Description: DescriptionAdded,
      DueDate: dueDateAdded,
    });
  }
  return (
    <>
      <Alert ref={alert} caption="Close">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops.. seems that you forgot to enter values
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure that you provide a valid value for every input field.
        </p>
      </Alert>
      <menu className="w-[35rem] mt-16">
        <div className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={save}
            >
              Save
            </button>
          </li>
        </div>
        <div>
          <Inputs type="text" ref={newTitle} label="Title" />
          <Inputs ref={newDescription} label="Description" textarea />
          <Inputs type="date" ref={newDueDate} label="Due Date" />
        </div>
      </menu>
    </>
  );
};
