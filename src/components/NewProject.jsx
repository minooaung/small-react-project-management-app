import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({ onSubmit, onCancel }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const duedateRef = useRef();

  const modalRef = useRef();

  let projectData = {};

  function handleSave() {
    projectData.title = titleRef.current.value;
    projectData.description = descriptionRef.current.value;
    projectData.dueDate = duedateRef.current.value;

    //console.log(projectData);
    if (
      projectData.title.trim() === "" ||
      projectData.description.trim() === "" ||
      projectData.dueDate.trim() === ""
    ) {
      //show error modal
      modalRef.current.open();
      return;
    }

    onSubmit(projectData);
  }

  return (
    <>
      <Modal ref={modalRef} buttonCaption="Close">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops... looks like you forgot to enter a value
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every input fields.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16 ">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={onCancel}
              className="text-stone-500 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-md bg-stone-700 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={titleRef} label="Title" isTextArea={false} />
          <Input ref={descriptionRef} label="Description" isTextArea={true} />
          <Input
            type="date"
            ref={duedateRef}
            label="Due Date"
            isTextArea={false}
          />
        </div>
      </div>
    </>
  );
}
