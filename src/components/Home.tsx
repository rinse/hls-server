import {Box, Container} from '@material-ui/core'
import React from 'react'
import PlayList from './PlayList'

export interface HomeProps {
    playList: string[]
}

export default function Home(props: HomeProps) {
    const {playList} = props
    return (
        <Container>
            <Box marginTop={6}>
                <PlayList videos={playList} />
            </Box>
        </Container>
    )
}
