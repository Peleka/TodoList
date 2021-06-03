import React, {useReducer} from 'react';
import classes from './App.module.css';
import Todolist from "./Todolist";
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    //BLL:
    let todoListID_1 = v1()
    let todoListID_2 = v1()

    //создаем фэйковые данные:
    let [todoLists, dispatchToTodolist] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])
    let [tasks, dispatchToTask] = useReducer(tasksReducer, {
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
        dispatchToTodolist(changeTodolistFilterAC(value, todolistID))
    }

    function removeTask(taskID: string, todolistID: string) {
        // const filteredTasks = tasks[todolistID].filter(t => t.id !== taskID)
        // tasks[todolistID] = filteredTasks
        // setTasks({...tasks})
        dispatchToTask(removeTaskAC(taskID, todolistID))

    }

    function addTasks(title: string, todolistID: string) {
        dispatchToTask(addTaskAC(title, todolistID))
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todolistID: string) {
        dispatchToTask(changeTaskStatusAC(taskID, newIsDoneValue, todolistID))
    }

    function changeTaskTitle(taskID: string, newTitle: string, todolistID: string) {
        dispatchToTask(changeTaskTitleAC(taskID, newTitle, todolistID))
    }

    function removeTodolist(todolistID: string) {
        dispatchToTodolist(removeTodolistAC(todolistID))
        delete tasks[todolistID]
    }

    function changeTodoListTitle(todolistID: string, title: string) {
        dispatchToTodolist(changeTodolistTitleAC(todolistID, title))
    }

    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatchToTask(action)
        dispatchToTodolist(action)
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
            <Grid item>
                <Paper elevation={3} style={{padding: "10px"}}>
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
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
