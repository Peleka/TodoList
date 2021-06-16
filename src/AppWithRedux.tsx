import React, {useCallback} from 'react';
import classes from './App.module.css';
import Todolist from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

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

function AppWithRedux() {
    console.log("App is called")
    //BLL:

    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists )
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const changeFilter = useCallback((value: FilterValuesType, todolistID: string) => {
        dispatch(changeTodolistFilterAC(value, todolistID))
    }, [])

    const removeTask = useCallback( (taskID: string, todolistID: string) => {
        // const filteredTasks = tasks[todolistID].filter(t => t.id !== taskID)
        // tasks[todolistID] = filteredTasks
        // setTasks({...tasks})
        dispatch(removeTaskAC(taskID, todolistID))
    }, [])

    const addTasks = useCallback( (title: string, todolistID: string) => {
        dispatch(addTaskAC(title, todolistID))
    }, [])

    const changeTaskStatus = useCallback((taskID: string, newIsDoneValue: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(taskID, newIsDoneValue, todolistID))
    }, [])

    const changeTaskTitle = useCallback( (taskID: string, newTitle: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, todolistID))
    }, [])

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
        delete tasks[todolistID]
    }, [])

    const changeTodoListTitle = useCallback( (todolistID: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistID, title))
    }, [])

    const addTodoList = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [])

//UI:
//     function getTaskForTodoList(todolist: TodolistType) {
//         switch (todolist.filter) {
//             case "active":
//                 return tasks[todolist.id].filter(t => !t.isDone)
//                 break;
//             case "completed":
//                 return tasks[todolist.id].filter(t => t.isDone)
//                 break;
//             default:
//                 return tasks[todolist.id]
//         }
//     }

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item>
                <Paper elevation={3} style={{padding: "10px"}}>
                    <Todolist
                        key={tl.id}
                        todolistID={tl.id}
                        title={tl.title}
                        tasks={tasks[tl.id]}
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

export default AppWithRedux;
