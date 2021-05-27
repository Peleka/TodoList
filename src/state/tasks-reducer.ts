import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string,
    todolistID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}

export type ChangeTaskActionType = {
    type: 'CHANGE-TASK-STATUS'
    status: boolean
    todolistID: string
    taskID: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    todolistID: string
    taskID: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskActionType | ChangeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            stateCopy[action.todolistID] = state[action.todolistID].filter(t => t.id !== action.taskID)
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistID]
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistID] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const task = state[action.todolistID].find(t => t.id === action.taskID)
            if (task) {
                task.isDone = action.status
            }
            return stateCopy
        }

        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const task = state[action.todolistID].find(t => t.id === action.taskID)
            if (task) {
                task.title = action.title
            }
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistID] = []

            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskID: taskID,
        todolistID: todolistID
    }
}
export const addTaskAC = (newTodolistTitle: string, todolistID: string): AddTaskActionType => {
    return {
        type: 'ADD-TASK',
        todolistID,
        title: newTodolistTitle
    }
}
export const changeTaskStatusAC = (taskID: string, status: boolean, todolistID: string): ChangeTaskActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        status: status, // status
        todolistID,
        taskID
    }
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistID: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        title,
        todolistID,
        taskID
    }
}

