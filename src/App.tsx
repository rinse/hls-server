import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios'
import queryString from 'query-string'
import Home from './components/Home'
import NavigationMenu from './components/NavigationMenu'
import Theatre from './components/Theatre'

function queryToStringArray(q: string | string[] | null): string[] {
    if (typeof q === 'string') {
        return [q]
    } else if (q === null) {
        return []
    } else {
        return q
    }
}

function safeHead(a: string[]): string | undefined {
    return a.length > 0 ? a[0] : undefined;
}

function usePlaylist(): string[] {
    const [videos, setVideos] = useState<string[]>([])
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('/video/playlist.json')
                setVideos(res.data?.videos ?? [])
            } catch (e) {
                console.error(e)
            }
        })()
    }, [])
    return videos
}

export default function App() {
    const videos = usePlaylist()
    return (
        <div className='App'>
            <NavigationMenu />
            <Router>
                <Route exact path='/'>
                    <Home playList={videos}/>
                </Route>
                <Route exact path='/watch' render={ props => {
                    const currentVideo = queryToStringArray(queryString.parse(props.location.search).v);
                    return <Theatre video={safeHead(currentVideo)} playList={videos} />
                }} />
            </Router>
        </div>
    );
}
