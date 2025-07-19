import React, {useState, useEffect} from 'react';
import "./index.css";

export default function Index() {

    const [task, setTask] = useState("");
    const [taskarray, listfunc] = useState<{text:String; checked:Boolean}[]>([]);
    const [loaded, isloaded] = useState(false);

    useEffect(() => {
        var data = localStorage.getItem("data");
        if (data) listfunc(JSON.parse(data as string));
        isloaded(true);
    },[]);

    useEffect(() => {
        if (loaded){
            localStorage.setItem("data",JSON.stringify(taskarray))
        }
    },[loaded, taskarray]);

    function add_task(){
        if (task === "") return alert("adding empty task not allowed!!");

        listfunc([...taskarray, {text:task, checked:false}]);
        setTask("")
    }

    function remove(index: number){
        var updated = [...taskarray];
        updated.splice(index,1);
        listfunc(updated);
    }

    function toggle(index: number){
        var updated = [...taskarray];
        updated[index].checked = !updated[index].checked;
        listfunc(updated);
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
            onChange={(e) => {setTask(e.target.value)}}
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
                onClick={ (e) =>{
                    if ((e.target as HTMLElement).tagName !== "SPAN") {
                        toggle(index)
                    }
                 }}
                > {val.text}
                    <span onClick={() => remove(index)}
                    >&times;</span>
                </li>
            ))}
          
        </ul>
      </div>
    </div>
  );
}
