import {CircularProgress, Typography} from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import Playlist from '../Playlist'
import {PromiseContainer} from '../hooks/usePromise'

const getPlaylist = async () => {
    const playlist = await axios.get('/video/playlist.json', {timeout: 5000}).then(res => res.data)
    if (playlist.videos === undefined || playlist.videos === null) {
        throw new Error('Failed to fetch playlist.')
    }
    return playlist.videos as string[]
}

export default function PlaylistContainer() {
    return (
        <PromiseContainer asyncFunction={getPlaylist}
                          onPending={() => <CircularProgress/>}
                          onRejected={e => <Typography>{e.message}</Typography>}
                          onFulfilled={value => <Playlist videoTitles={value}/>}
        />
    )
}
