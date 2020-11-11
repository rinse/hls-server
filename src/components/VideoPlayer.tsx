import React, {KeyboardEventHandler, MouseEventHandler, useEffect, useState} from 'react';
// @ts-ignore
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface Props {
    // Standard <video> Element options
    controls?: boolean;
    autoplay?: boolean | 'muted' | 'play' | 'any';
    height?: string | number;
    loop?: boolean;
    muted?: boolean;
    poster?: string;
    preload?: 'auto' | 'metadata' | 'none';
    src?: string;
    width?: string | number;
    // Video.js-specific Options
    aspectRatio?: string;
    autoSetup?: boolean;
    breakpoints?: Object;
    fluid?: boolean;
    inactivityTimeout?: number;
    language?: string;
    languages?: Object;
    liveui?: boolean;
    nativeControlsForTouch?: boolean;
    notSupportedMessage?: string;
    fullscreen?: Object;
    playbackRates?: [];
    plugins?: Object;
    responsive?: boolean;
    sources?: {
        src: string;
        type: string;
    }[];
    suppressNotSupportedError?: boolean;
    techCanOverridePoster?: boolean;
    techOrder?: [];
    userActions?: {
        doubleClick?: boolean | MouseEventHandler;
        hotkeys?: boolean | KeyboardEventHandler | {
                fullscreenKey?: KeyboardEventHandler;
                muteKey?: KeyboardEventHandler;
                playPauseKey?: KeyboardEventHandler;
            }
    };
    "vtt.js"?: string;
    html5?: {
        nativeControlsForTouch?: boolean;
        nativeAudioTracks?: boolean;
        nativeTextTracks?: boolean;
        nativeVideoTracks?: boolean;
        preloadTextTracks?: boolean;
    };
}

export default function VideoPlayer(props: Props) {
    const [videoNode, setVideoNode] = useState(null as HTMLVideoElement | null);
    useEffect(() => {
        if (videoNode == null) {
            return;
        }
        const player = videojs(videoNode, props, function() {
            // @ts-ignore
            // const player: HTMLVideoElement = this;
        });
        return () => {
            if (player) {
                player.dispose();
            }
        };
    }, [videoNode, props]);
    return (
        <div data-vjs-player>
            <video ref={ e => setVideoNode(e) } className="video-js vjs-default-skin vjs-big-play-centered"
                   onClick={e => {
                        const video = e.currentTarget;
                        video.paused ? video.pause() : video.play();
                    }}>
            </video>
        </div>
    );
}
