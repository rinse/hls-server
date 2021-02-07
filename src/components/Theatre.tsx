import React from 'react'
import {Box, Container} from '@material-ui/core'
import ReactPlayer from 'react-player'
import If from './If'
import PlaylistContainer from './containers/PlaylistContainer'

export interface TheatreProps {
    video?: string
}

export default function Theatre(props: TheatreProps) {
    const {video} = props
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
                <PlaylistContainer />
            </Box>
        </Container>
    )
}
