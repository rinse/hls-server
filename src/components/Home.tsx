import {Box, Container} from '@material-ui/core'
import React from 'react'
import PlaylistContainer from './containers/PlaylistContainer'

export default function Home() {
    return (
        <Container>
            <Box marginTop={6}>
                <PlaylistContainer />
            </Box>
        </Container>
    )
}
