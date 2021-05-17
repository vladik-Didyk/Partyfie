import React, { useState, useEffect } from 'react';
import useAuth from './useAuth'
import Player from './Player';
import { Container, Form } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult'
import axios from 'axios'

const spotifyApi = new SpotifyWebApi({
    clientId: "585d16df8b674db88c2ba20730fab1c7",
})

export default function Search({ code }) {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState('')


function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
        setLyrics("")
    }

    useEffect(() => {
        if(!playingTrack) return 

        axios.get('http://localhost:3001/lyrics', { 
            params:{
                track: playingTrack.title,
                artist: playingTrack.artist
            }
        }).then(res=>{
            setLyrics(res.data.lyrics)
        })
    }, [playingTrack])

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!accessToken) return

        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            setSearchResults(
                res.body.tracks.items.map(track => {
                    //listing results for each user letter typed
                    const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    },
                    track.album.images[0])

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url,
                    }
                })
            )
        })

        return () => (cancel = true)
    }, [search, accessToken])

    return (
        <Container className='d-flex flex-column py-2' style={{ width: 100 }}>
            <Form.Control
                type="search"
                placeholder=' Search Songs or Artits'
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div className='flex-grow-1 my-2' style={{ overflowY: "auto" }}>
                {searchResults.map(track => (
                    <TrackSearchResult 
                    key={track.uri} 
                    chooseTrack={chooseTrack} 
                    track={track} />
                ))}

                {searchResults.length===0 && (
                    <div className='text-center' style={{whiteSpace:"pre"}}>{lyrics}
                    </div>
                )}

            </div>
            <div><Player accessToken={accessToken} trackUri={playingTrack?.uri} /> </div>

        </Container>
    )

}




