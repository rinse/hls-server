import React from 'react'
import {Box, Paper, Typography} from "@mui/material";
import ReactPlayer from 'react-player'
import PlaylistContainer from './containers/PlaylistContainer'

export interface TheatreProps {
  videoId: string
}

export default function Theatre(props: TheatreProps) {
  const {videoId} = props;
  const videoTitle = videoId;
  return (
    <>
      <ReactPlayer url={`/videos/${videoId}/index.m3u8`}
                   className='react-player' controls
                   width='100%' height='100%'/>
      <Box sx={{margin: 1}}>
        <Typography sx={{fontWeight: "bold", fontSize: 18}}>{videoTitle}</Typography>
      </Box>
      <Paper variant="outlined">
        <PlaylistContainer videoIdPlaying={props.videoId}/>
      </Paper>
    </>
  )
}
