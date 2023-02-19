import React from "react";
import {Avatar, Box, List, ListItemAvatar, ListItemButton, ListItemText} from "@mui/material";
import {ArrowRight as ArrowRightIcon} from "@mui/icons-material";

export type PlayListProps = {
  videoIds: string[],
  selected?: string,
  navigateTo: (destination: string) => void,
}

function EmptyIcon() {
  return <Box sx={{width: 24}}/>;
}

export default function Playlist(props: PlayListProps) {
  const {videoIds, selected, navigateTo} = props
  return (
    <List sx={{width: "100%", backgroundColor: "background.default"}} component='nav'>
      {videoIds.map(videoId => {
        const isSelected = videoId === selected;
        const videoTitle = videoId;
        return (
          <ListItemButton key={videoId}
                          onClick={() => navigateTo(`/watch?v=${encodeURI(videoId)}`)}
                          selected={isSelected}>
            {isSelected ? <ArrowRightIcon/> : <EmptyIcon/>}
            <ListItemAvatar>
              <Avatar src={`videos/${videoId}/thumbnail.png`}/>
            </ListItemAvatar>
            <ListItemText primary={videoTitle}/>
          </ListItemButton>
        )
      })}
    </List>
  );
}
