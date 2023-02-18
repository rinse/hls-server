import React from 'react'
import {Avatar, List, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";

export interface PlayListProps {
  videoIds: string[]
  selected?: string
}

export default function Playlist(props: PlayListProps) {
  const {videoIds, selected} = props
  return (
    <List sx={{width: "100%", backgroundColor: "background.default"}} component='nav'>
      {videoIds.map(videoId =>
        <ListItemButton component='a' key={videoId}
                        href={`/watch?v=${encodeURI(videoId)}`} selected={videoId === selected}>
          <ListItemAvatar>
            <Avatar src={`videos/${videoId}/thumbnail.png`}/>
          </ListItemAvatar>
          <ListItemText primary={videoId /* videoTitle */}/>
        </ListItemButton>
      )}
    </List>
  );
}
