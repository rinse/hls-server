import React from 'react'
import {Avatar, createStyles, List, ListItem, ListItemAvatar, ListItemText, Theme} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

export interface PlayListProps {
    videos: string[]
    currentVideo?: string
}

const useVideoListStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.default,
        },
    }),
);

export default function Playlist(props: PlayListProps) {
    const styles = useVideoListStyles();
    const listItemVideo = props.videos.map(v =>
        <ListItem button component='a' key={v}
                  href={`/watch?v=${encodeURI(v)}`} selected={v === props.currentVideo}>
            <ListItemAvatar>
                <Avatar src={`video/${v}/thumbnail.png`} />
            </ListItemAvatar>
            <ListItemText primary={v}/>
        </ListItem>
    );
    return (
        <div className={styles.root}>
            <List component={'nav'}>
                {listItemVideo}
            </List>
        </div>
    );
}
