import React, {PropsWithChildren, useState} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import queryString, {ParsedQuery} from 'query-string'
import Theatre from './components/Theatre'
import {AppBar, Box, Container, createStyles, Drawer} from "@material-ui/core";
import clsx from "clsx";
import {makeStyles} from "@material-ui/core/styles";
import MyToolbar from "./components/MyToolbar";
import DrawerContent from "./components/DrawerContent";
import PlaylistContainer from "./components/containers/PlaylistContainer";

const pxDrawerWidth = 240

const useStyles = makeStyles((theme) => createStyles({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: '#20232a',
    },
    appBarShift: {
        marginLeft: pxDrawerWidth,
        width: `calc(100% - ${pxDrawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawerPaper: {
        poison: 'relative',
        whiteSpace: 'nowrap',
        width: pxDrawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
}))

export default function App() {
    const classes = useStyles()
    const [drawerOpen, setDrawerOpen] = useState(false)
    return (
        <>
            <AppBar position="static" className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
                <MyToolbar isDrawerOpen={drawerOpen} onMenuClick={() => setDrawerOpen(true)}/>
            </AppBar>
            <Drawer variant="persistent" open={drawerOpen}
                    classes={{paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose)}}>
                <DrawerContent onDrawerClose={() => setDrawerOpen(false)}>
                    {"Hello"}
                </DrawerContent>
            </Drawer>
            <Router>
                <Route exact path='/'>
                    <MyContainer>
                        <PlaylistContainer/>
                    </MyContainer>
                </Route>
                <Route exact path='/watch' render={props => {
                    const parsedQuery = queryString.parse(props.location.search)
                    const videoIds = parsedQuery.v
                    const videoId = safeHead(queryToStringArray(videoIds))
                    if (videoId === null) {
                        return `videoId is not valid: ${videoIds}`
                    }
                    return (
                        <MyContainer>
                            <Theatre video={videoId}/>
                        </MyContainer>
                    )
                }}/>
            </Router>
        </>
    );
}

function MyContainer(props: PropsWithChildren<{}>) {
    return (
        <Container>
            <Box marginTop={6}>
                {props.children}
            </Box>
        </Container>
    )
}

function queryToStringArray(q: string | string[] | null | undefined): string[] {
    if (typeof q === 'string') {
        return [q]
    } else if (q === null) {
        return []
    } else if (q === undefined) {
        return []
    } else {
        return q
    }
}

function safeHead(a: string[]): string | null {
    return a.length > 0 ? a[0] : null;
}
