import React from 'react'
import {Typography, CircularProgress} from "@mui/material";
import axios from 'axios'
import Playlist from '../Playlist'
import {PromiseContainer} from '../hooks/usePromise'

const getPlaylist = async () => {
  const playlist = await axios.get('/videos/playlist.json', {timeout: 5000}).then(res => res.data)
  if (playlist.videos === undefined || playlist.videos === null) {
    throw new Error('Failed to fetch playlist.')
  }
  return playlist.videos as string[]
}

type PlaylistContainerProps = {
  videoIdPlaying?: string,
}

export default function PlaylistContainer(props: PlaylistContainerProps) {
  return (
    <PromiseContainer asyncFunction={getPlaylist}
                      onPending={() => <CircularProgress/>}
                      onRejected={e => <Typography>{e.message}</Typography>}
                      onFulfilled={value => <Playlist videoTitles={value} selected={props.videoIdPlaying}/>}
    />
  )
}
