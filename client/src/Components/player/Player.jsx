import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Player ({token, trackUri}) {

    if (!token) return null
    return <SpotifyPlayer
    token={token}
    showSaveIcon
    uris = {trackUri ? [trackUri] : []}
    /> 
    
}