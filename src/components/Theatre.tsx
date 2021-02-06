import React from 'react'
import {Box, Container} from '@material-ui/core'
import ReactPlayer from 'react-player'
import If from './If'
import PlayList from './PlayList'

export interface TheatreProps {
    video?: string
    playList: string[]
}

export default function Theatre(props: TheatreProps) {
    const { video, playList } = props
    return (
        <Container>
            <Box marginTop={6}>
                <If condition={video !== undefined}>
                    <ReactPlayer url={`/video/${video}/index.m3u8`}
                                 className='react-player' controls
                                 width='100%' height='100%'/>
                    <h1 style={{fontWeight: 400, fontSize: '18px', lineHeight: '2.4rem'}}>{video}</h1>
                </If>
            </Box>
            <Box marginTop={6}>
                <PlayList videos={playList} currentVideo={video} />
            </Box>
        </Container>
    )
}
