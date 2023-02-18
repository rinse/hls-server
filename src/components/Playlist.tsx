import React from 'react'
import {Avatar, createStyles, List, ListItem, ListItemAvatar, ListItemText, Theme} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

export interface PlayListProps {
    videoTitles: string[]
    selected?: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.default,
        },
    }),
);

export default function Playlist(props: PlayListProps) {
    const classes = useStyles();
    const {videoTitles, selected} = props
    return (
        <List className={classes.root} component={'nav'}>
            {videoTitles.map(videoTitle =>
                <ListItem button component='a' key={videoTitle}
                          href={`/watch?v=${encodeURI(videoTitle)}`} selected={videoTitle === selected}>
                    <ListItemAvatar>
                        <Avatar src={`videos/${videoTitle}/thumbnail.png`}/>
                    </ListItemAvatar>
                    <ListItemText primary={videoTitle}/>
                </ListItem>
            )}
        </List>
    );
}
