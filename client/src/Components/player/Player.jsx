import React, { useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player ({token, trackUri}) {
    const [play, setPlay] = useState(false);

    useEffect(() => {
        setPlay(true);
    }, [trackUri])

    if (!token) return null;
    return <SpotifyPlayer
        styles={{
            activeColor: '#fff',
            bgColor: '#333',
            color: '#fff',
            loaderColor: '#fff',
            sliderColor: '#1cb954',
            trackArtistColor: '#ccc',
            trackNameColor: '#fff',
        }}
        callback={(state) => {
            if (!state.isPlaying) setPlay(false);
        }}
        token={token}
        play={play}
        showSaveIcon
        uris = {trackUri ? [trackUri] : []}
    /> 
    
}