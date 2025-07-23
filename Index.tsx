import React, { useState, useEffect } from "react";
import "./index.css";

export default function Index() {
  const [task, setTask] = useState("");
  const [taskarray, listfunc] = useState<{ text: String; checked: Boolean }[]>(
    []
  );
  const [loaded, isloaded] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    var data = localStorage.getItem("data");
    if (data) listfunc(JSON.parse(data as string));
    isloaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("data", JSON.stringify(taskarray));
    }
  }, [loaded, taskarray]);

  function add_task() {
    if (task === "") return alert("adding empty task not allowed!!");

    listfunc([...taskarray, { text: task, checked: false }]);
    setTask("");
  }

  function remove(index: number) {
    var updated = [...taskarray];
    updated.splice(index, 1);
    listfunc(updated);
  }

  function toggle(index: number) {
    var updated = [...taskarray];
    updated[index].checked = !updated[index].checked;
    listfunc(updated);
  }

  function edit(index: number) {
    setEditingIndex(index);
    setEditText(taskarray[index].text as string);
  }

  function saveEdit(index: number) {
    if (editText.trim() === "") return alert("Task cannot be empty!");

    var updated = [...taskarray];
    updated[index].text = editText;
    listfunc(updated);
    setEditingIndex(null);
    setEditText("");
  }

  function cancelEdit() {
    setEditingIndex(null);
    setEditText("");
  }

  return (
    <div>
      <h1 id="text">Welcome To Your To-Do List App</h1>
      <div id="search-part">
        <div id="search-task">
          <input
            type="text"
            id="search-place"
            placeholder="Add your task here"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
          <button id="add-task" onClick={add_task}>
            ADD
          </button>
        </div>
        <ul id="task">
          {taskarray.map((val, index) => (
            <li
              key={index}
              className={val.checked ? "checked" : ""}
              onClick={(e) => {
                if (
                  (e.target as HTMLElement).tagName !== "SPAN" &&
                  (e.target as HTMLElement).tagName !== "INPUT" &&
                  (e.target as HTMLElement).tagName !== "BUTTON"
                ) {
                  if (editingIndex !== index) {
                    toggle(index);
                  }
                }
              }}
            >
              {editingIndex === index ? (
                <div className="edit-container">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="edit-input"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        saveEdit(index);
                      }
                      if (e.key === "Escape") {
                        cancelEdit();
                      }
                    }}
                    autoFocus
                  />
                  <button className="save-btn" onClick={() => saveEdit(index)}>
                    ✓
                  </button>
                  <button className="cancel-btn" onClick={cancelEdit}>
                    ✗
                  </button>
                </div>
              ) : (
                <>
                  {val.text}
                  <div className="button-container">
                    <span className="edit-btn" onClick={() => edit(index)}>
                      ✎
                    </span>
                    <span className="remove-btn" onClick={() => remove(index)}>
                      &times;
                    </span>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
