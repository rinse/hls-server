import {Box, Container, createStyles} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles";
import React from 'react'
import ReactPlayer from 'react-player'
import PlaylistContainer from './containers/PlaylistContainer'

const useStyles = makeStyles((theme) => createStyles({
    videoTitle: {
        fontWeight: 400,
        fontSize: '18px',
        lineHeight: '2.4rem',
    },
}))

export interface TheatreProps {
    video: string
}

export default function Theatre(props: TheatreProps) {
    const {video} = props
    const classes = useStyles()
    return (
        <>
            <ReactPlayer url={`/videos/${video}/index.m3u8`}
                         className='react-player' controls
                         width='100%' height='100%'/>
            <h1 className={classes.videoTitle}>{video}</h1>
            <PlaylistContainer/>
        </>
    )
}
