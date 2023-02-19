import React from 'react'
import {Box, Paper, Typography} from "@mui/material";
import ReactPlayer from 'react-player'
import PlaylistContainer from './containers/PlaylistContainer'

export type TheatreProps = {
  videoId: string,
  navigateTo: (destination: string) => void,
}

export default function Theatre(props: TheatreProps) {
  const {videoId, navigateTo} = props;
  const videoTitle = videoId;
  return (
    <>
      <Box sx={{position: "sticky", top: 0, zIndex: 1}}>
        <ReactPlayer url={`/videos/${videoId}/index.m3u8`}
                     className='react-player'
                     controls
                     playing={true}
                     width='100%' height='100%'/>
      </Box>
      <Box sx={{margin: 1}}>
        <Typography sx={{fontWeight: "bold", fontSize: 18}}>{videoTitle}</Typography>
      </Box>
      <Paper variant="outlined">
        <PlaylistContainer videoIdPlaying={videoId} navigateTo={navigateTo}/>
      </Paper>
    </>
  )
}
