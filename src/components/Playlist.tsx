import React from 'react'
import {Avatar, List, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";

export interface PlayListProps {
    videoTitles: string[]
    selected?: string
}

export default function Playlist(props: PlayListProps) {
    const {videoTitles, selected} = props
    return (
        <List sx={{width: "100%", backgroundColor: "background.default"}} component='nav'>
            {videoTitles.map(videoTitle =>
                <ListItemButton component='a' key={videoTitle}
                          href={`/watch?v=${encodeURI(videoTitle)}`} selected={videoTitle === selected}>
                    <ListItemAvatar>
                        <Avatar src={`videos/${videoTitle}/thumbnail.png`}/>
                    </ListItemAvatar>
                    <ListItemText primary={videoTitle}/>
                </ListItemButton>
            )}
        </List>
    );
}
