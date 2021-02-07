import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Box, CircularProgress, Container, Typography} from '@material-ui/core'
import Playlist from '../Playlist'

interface PlayListResponse {
    videos: string[]
    isLoading: boolean
    error?: Error
}

function usePlaylist(): PlayListResponse {
    const [videos, setVideos] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | undefined>(undefined)
    void useEffect(() => {
        void (async () => {
            try {
                setIsLoading(true)
                const playlist = await axios.get('/video/playlist.json', {
                    timeout: 5000
                }).then(res => res.data?.videos)
                if (playlist) {
                    setVideos(playlist)
                }
            } catch (e) {
                setError(e)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])
    return {videos, isLoading, error}
}

export default function PlaylistContainer() {
    const {videos, isLoading, error} = usePlaylist()
    let element
    if (isLoading) {
        element = <CircularProgress />
    } else if (error !== undefined) {
        element = <Typography>{error.message}</Typography>
    } else {
        element = <Playlist videos={videos} />
    }
    return (
        <Container>
            <Box marginTop={6}>
                {element}
            </Box>
        </Container>
    )
}
