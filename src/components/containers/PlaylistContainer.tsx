import React, {useCallback} from 'react'
import {Typography, CircularProgress} from "@mui/material";
import axios from "axios";
import Playlist from "../Playlist";
import {PromiseResultRenderer, usePromise} from "../hooks/usePromise";

type PlaylistJson = {
  videoIds: string[],
}

async function fetchPlaylist(): Promise<PlaylistJson> {
  const playlist = await axios.get('/videos/playlist.json', {timeout: 5000}).then(res => res.data)
  if (playlist.videoIds === undefined || playlist.videoIds === null) {
    throw new Error('Failed to fetch playlist.')
  }
  return playlist
}

export type PlaylistContainerProps = {
  videoIdPlaying?: string,
  navigateTo: (destination: string) => void,
}

export default function PlaylistContainer(props: PlaylistContainerProps) {
  const {videoIdPlaying, navigateTo} = props;
  const result = usePromise(fetchPlaylist);
  const circularProgress = useCallback(() => <CircularProgress/>, []);
  return (
    <PromiseResultRenderer
      result={result}
      onPending={circularProgress}
      onRejected={e => <Typography>{e.message}</Typography>}
      onFulfilled={playlist =>
        <Playlist videoIds={playlist.videoIds} selected={videoIdPlaying} navigateTo={navigateTo}/>}
    />
  )
}
