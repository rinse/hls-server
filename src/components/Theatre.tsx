import React from 'react'
import {Box, Paper, Typography} from "@mui/material";
import ReactPlayer from 'react-player'
import PlaylistContainer from './containers/PlaylistContainer'

export interface TheatreProps {
  video: string
}

export default function Theatre(props: TheatreProps) {
  const {video} = props;
  return (
    <>
      <ReactPlayer url={`/videos/${video}/index.m3u8`}
                   className='react-player' controls
                   width='100%' height='100%'/>
      <Box sx={{margin: 1}}>
        <Typography sx={{fontWeight: "bold", fontSize: 18}}>{video}</Typography>
      </Box>
      <Paper variant="outlined">
        <PlaylistContainer/>
      </Paper>
    </>
  )
}
