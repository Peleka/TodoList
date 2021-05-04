import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    //BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    //создаем фэйковые данные:
    const [todoLists, setTodolists] = useState<Array<TodolistType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "React", isDone: true}
        ],
        [todoListID_2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
        ]
    })

    function changeFilter(value: FilterValuesType, todolistID: string) {
        setTodolists(todoLists.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl))
    }
    function removeTask(taskID: string, todolistID: string) {
        // const filteredTasks = tasks[todolistID].filter(t => t.id !== taskID)
        // tasks[todolistID] = filteredTasks
        // setTasks({...tasks})

        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)})
    }
    function addTasks(title: string, todolistID: string) {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todolistID: string) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        })
    }

    function changeTaskTitle(taskID: string, newTitle: string, todolistID: string) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, title: newTitle} : t)
        })
    }

    function removeTodolist(todolistID: string) {
        setTodolists(todoLists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }

    function addTodoList(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            title: title,
            filter: "all"
        }
        setTodolists([todolist, ...todoLists])
        setTasks({...tasks, [todolist.id]: []})
    }

//UI:
    function getTaskForTodoList(todolist: TodolistType) {
        switch (todolist.filter) {
            case "active":
                return tasks[todolist.id].filter(t => !t.isDone)
                break;
            case "completed":
                return tasks[todolist.id].filter(t => t.isDone)
                break;
            default:
                return tasks[todolist.id]
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Todolist
                key={tl.id}
                todolistID={tl.id}
                title={tl.title}
                tasks={getTaskForTodoList(tl)}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTasks={addTasks}
                filter={tl.filter}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}
                changeTaskTitle={changeTaskTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoListsComponents}
        </div>
    );
}

export default App;
