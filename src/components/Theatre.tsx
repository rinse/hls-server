import React from 'react'
import {Typography} from "@mui/material";
import ReactPlayer from 'react-player'
import PlaylistContainer from './containers/PlaylistContainer'

export interface TheatreProps {
    video: string
}

export default function Theatre(props: TheatreProps) {
    const {video} = props
    return (
        <>
            <ReactPlayer url={`/videos/${video}/index.m3u8`}
                className='react-player' controls
                width='100%' height='100%' />
            <Typography sx={{fontWeight: 400, fontSize: "18px", lineHeight: "2.4rem"}} >{video}</Typography>
            <PlaylistContainer />
        </>
    )
}
