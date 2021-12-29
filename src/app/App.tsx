import React, {useCallback, useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializedAppTC, RequestStatusType} from './app-reducer'
import {HashRouter, Route} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {logOutTC} from "../features/Login/login-reducer";


function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialised = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [dispatch])

    const logoutHandler = useCallback(() => {
        dispatch(logOutTC())

    }, [dispatch])

    if(!isInitialised) {
        return <div><CircularProgress /></div>
    }

    return (
        <HashRouter>
            <div>
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar className={"Toolbar"}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            My Planner
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Route exact path={"/"} render={() => <TodolistsList/>}/>
                    <Route path={"/login"} render={() => <Login/>}/>
                </Container>
            </div>
        </HashRouter>
    )
}

export default App
