import React, { useState } from 'react';
import './App.css';
import Todolist from "./Todolist";
import { v1 } from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    //BLL:
    //создаем фэйковые данные:
    const [tasks, setTasks] = useState <Array<TaskType>> ([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "React", isDone: true}
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")

    function changeFilter(value:FilterValuesType) {
        setFilter(value)
    }

    function removeTask(taskID: string) {
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)
    }
    function addTasks(title: string) {
        const newTask: TaskType = {
            id: v1(),
            title, //если назв переменной совпадает со значение можно просто записать title: title
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    function changeTaskStatus (taskID: string, newIsDoneValue: boolean) {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t ))
       // let task = tasks.find(t => t.id === taskID)
       //  if(task) {
       //      task.isDone = isDone;
       //      setTasks([...tasks])
       //  }
    }

//UI:

    function getTaskForTodoList() {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
                break;
            case "completed":
                return tasks.filter(t => t.isDone)
                break;
            default:
                return tasks
        }
    }

    return (
        <div className="App">
            <Todolist
                title={"What to learn"}
                tasks={getTaskForTodoList()}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTasks={addTasks}
                filter={filter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
