import React, {ReactElement, useState} from 'react';
import {
    AppBar,
    Avatar,
    Box, Button,
    Container,
    createStyles, Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Theme, Toolbar, Typography
} from "@material-ui/core"
import VideoPlayer from "./components/VideoPlayer";
import {makeStyles} from "@material-ui/core/styles";
import queryString from 'query-string';
import {BrowserRouter as Router, Route} from "react-router-dom";


const useNavStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: "#20232a",
        },
        title: {
            color: "#ffffff",
            flexGrow: 1,
        },
        element: {
            color: "#ffffff",
        },
        selected: {
            color: "#61dafb",
        },
    }),
);

function NavigationMenu() {
    const styles = useNavStyles();
    return (
        <AppBar position="static" classes={{root: styles.root}}>
            <Toolbar>
                <Typography variant="h6" className={styles.title}>
                    <Link href="/" color="inherit" underline="none">HLS</Link>
                </Typography>
                <Button className={styles.element}>Sample1</Button>
                <Button className={styles.element}>Sample2</Button>
            </Toolbar>
        </AppBar>
    );
}

const useVideoListStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.default,
        },
    }),
);

interface VideoListProps {
    videos: string[];
    currentVideo?: string;
}

function VideoList(props: VideoListProps) {
    const styles = useVideoListStyles();
    const listItemVideo = props.videos.map(v =>
            <ListItem button component="a" key={v}
                      href={"/watch?v=" + encodeURI(v)} selected={v === props.currentVideo}>
                <ListItemAvatar>
                    <Avatar src={"video/" + v + "/thumbnail.png"} />
                </ListItemAvatar>
                <ListItemText primary={v}/>
            </ListItem>
        );
    return (
        <div className={styles.root}>
            <List component={"nav"}>
                {listItemVideo}
            </List>
        </div>
    );
}

function queryToStringArray(q: string | string[] | null): string[] {
    if (typeof q === "string") {
        return [q];
    } else if (q === null) {
        return [];
    } else {
        return q;
    }
}

function safeHead(a: string[]): string | undefined {
    return a.length > 0 ? a[0] : undefined;
}

function If(prop: React.PropsWithChildren<{condition: boolean}>) {
    if (prop.condition) {
        return prop.children as ReactElement;
    }
    return null;
}

function App() {
    const videos: string[] = [
    ];  // get this from somewhere
    return (
        <div className="App">
            <NavigationMenu />
            <Router>
                <Route exact path="/" render={ props =>
                    <Container>
                        <Box marginTop={6}>
                            <VideoList videos={videos} />
                        </Box>
                    </Container>
                } />

                <Route exact path="/watch" render={ props => {
                    const currentVideo = queryToStringArray(queryString.parse(props.location.search).v);
                    return (
                        <Container>
                            <Box marginTop={6}>
                                <If condition={currentVideo.length > 0}>
                                    <VideoPlayer controls responsive html5={{nativeControlsForTouch: true}}
                                                 sources={[{
                                                     src: "video/" + currentVideo[0] + "/index.m3u8",
                                                     type: "application/x-mpegURL"
                                                 }]}
                                    />
                                    <h1 style={{fontWeight: 400, fontSize: "18px", lineHeight: "2.4rem"}}>{currentVideo[0]}</h1>
                                </If>
                            </Box>
                            <Box marginTop={6}>
                                <VideoList videos={videos} currentVideo={safeHead(currentVideo)} />
                            </Box>
                        </Container>
                    );
                }} />
            </Router>
        </div>
    );
}

export default App;
