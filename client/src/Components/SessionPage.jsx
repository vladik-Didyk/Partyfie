import { useAuth } from "./Auth";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "../App.css";
import axios from "axios";
import Player from "../Components/player/Player"
import '../Components/SessionPage.css'

export default function SessionPage() {
    const { token } = useAuth();
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [spotifyDevice, setSpotifyDevice] = useState("");
    const [state, setState] = useState({ message: "", name: "" });
    const [chat, setChat] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [queue, setQueue] = useState([]);
    const [username, setUsername] = useState('')
    const socketRef = useRef();

    const sessionId = "60a3eca767ff83bffd970bfa";

    const onTextChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const chooseTrack = (track) => {
        setPlayingTrack(track)
        setSearchText("")
    }

    const onMessageSubmit = (e) => {
        const { name, message } = state;
        socketRef.current.emit("message", { name, message });
        e.preventDefault();
        setState({ message: "", name });
    };

    const renderChat = () => {
        return chat.map(({ name, message }, index) => (
            <div key={index}>
                <h3>
                    {name}: <span style={{ 'color': 'white' }}>{message}</span>
                </h3>
            </div>
        ));
    };

    function getAuthConfig(token) {
        return {
            headers: {
                Authorization: "Bearer " + token,
            },
        };
    }

    async function handleOnSubmit(event) {
        if (searchText.length === 0) {
            return;
        }
        searchText.replace(" ", "%20");
        const response = await axios.get(
            `https://api.spotify.com/v1/search?q=${searchText}&type=track&limit=15&offset=0`,
            getAuthConfig(token)
        );
        if (response.data.tracks.items.length !== 0) {
            setSearchResults(response.data.tracks.items);
        }
    }

    async function handleOnAddQueue(uri) {

        await axios.post(`http://localhost:8080/session/${sessionId}/queue`, { uri });
        socketRef.current.emit("song_queued", uri);
        const uriSplit = uri.split(":");
        await axios.post(`https://api.spotify.com/v1/me/player/queue?uri=${uriSplit[0]}%3A${uriSplit[1]}%3A${uriSplit[2]}&device_id=${spotifyDevice}`, {}, getAuthConfig(token));
        console.log("uri", uri);
        chooseTrack(uri);
    }

    useEffect(() => {
        async function fetchUsername() {
            const response = await axios.get("https://api.spotify.com/v1/me", getAuthConfig(token));
            setUsername(response.data.display_name);
        }
        try {
            fetchUsername();
        } catch (err) {
            console.log(err);
        }
    }, [token]);

    useEffect(() => {
        async function fetchSpotifyDevice() {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/player/devices",
                getAuthConfig(token)
            );
            if (response.data.devices.length !== 0) {
                setSpotifyDevice(response.data.devices[0].id);
            }
        }

        async function fetchSessionQueue() {
            const response = await axios.get(`http://localhost:8080/session/${sessionId}/queue`);
            if (response.data.queue) {

                setQueue(response.data.queue);
            }
        }

        fetchSpotifyDevice();
        fetchSessionQueue();
    }, [token]);

    useEffect(() => {
        socketRef.current = io.connect("http://localhost:8080");
        socketRef.current.on("message", ({ name, message }) => {
            setChat([...chat, { name, message }]);
        });
        socketRef.current.on("song_queued", async (track) => {
            try {
                const prev = queue;
                setQueue([...queue, track]);
                // if (prev.length === 0) {
                //     // await axios.post(`https://api.spotify.com/v1/me/player/next?device_id=${spotifyDevice}`, {}, getAuthConfig(token));
                //     chooseTrack(track);
                // }
                // else {
                //     let response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing?market=IL', getAuthConfig(token));
                //     console.log(response.data);
                //     // while (response.data.item.uri !== track) {
                //     //     setTimeout(async () => {
                //     //         response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing?market=IL', getAuthConfig(token));
                //     //     }, 3000);
                //     // }
                //     // await axios.post(`https://api.spotify.com/v1/me/player/next?device_id=${spotifyDevice}`, {}, getAuthConfig(token));
                // }
            } catch (err) {
                console.log(err);
            }
        });
        return () => socketRef.current.disconnect();
    }, [chat, queue, token, spotifyDevice]);



    const style = !state.name.trim() ? { background: 'white', } : null

    return (
        <div className="sessionp">
            <div className='leftSide_Container'>
                <div className="searchSessionp" >
                    <label htmlFor="spotify-search"></label>
                    <input
                        className='inputSearchSessionp'
                        type="text"
                        id="spotify-search"
                        onChange={(event) => setSearchText(event.target.value)}
                    />
                    <button
                        className="sessionBtnOfSearch BtnSessionZero"
                        type="submit"
                        onClick={(event) => handleOnSubmit(event)}
                    >Search</button>
                </div>
                <div className='containerOfResultsFromSpotify'>
                    {searchResults && (

                        searchResults.map((result) => {

                            return (
                                <div className='itemResultsFromSpotify'>

                                    <iframe
                                        className='spotifyIframe'
                                        title={result.uri}
                                        src={`https://open.spotify.com/embed/track/${result.id}`}
                                        width="300"
                                        height="80"
                                        frameBorder="0"
                                        allowtransparency="true"
                                        chooseTrack={chooseTrack}
                                        allow="encrypted-media"
                                    ></iframe>

                                    <button
                                        className='btnAddToQueue BtnSessionZero'
                                        onClick={() => handleOnAddQueue(result.uri)}
                                    >

                                    </button>
                                </div>
                            );
                        })

                    )}
                </div>
            </div>

            <div className='RigthSide_Container'>

                <input
                    className="nameField"
                    name="name"
                    onChange={(e) => onTextChange(e)}
                    value={state.name}
                    label="Name"
                    autoFocus={true}
                    style={style}
                    placeholder='What is your name?'
                />

                <div className="queueOfSongs">
                    <h1 style={{ 'color': 'white' }}>Queue</h1>
                    <p style={{
                        "textDecoration": 'underline',
                        'color': 'white'
                    }}
                    >Press green triangle to add song</p>
                    <ol className='ol_queueOfSongs'>
                        {queue.map((song) => {
                            return <li className='li_queueOfSongs'
                                style={{ 'color': 'white' }}
                                key={song}>{song}
                            </li>
                        })}
                    </ol>

                    <div className="card">

                        <Player token={token} trackUri={playingTrack ? playingTrack : ""} />

                    </div>
                </div>



                <div className="render-chat">
                    <h1 style={{ 'color': 'white' }}>Messenger</h1>
                    {renderChat()}
                    <div className='ContainerSessionPage_message'>

                        <input
                            className='ContainerSessionPage_input'
                            name="message"
                            onChange={(e) => onTextChange(e)}
                            value={state.message}
                            label="Message"
                            placeholder="Don't be shy... Write something"
                        />
                        <button className="btnSendMessegeSessionPage BtnSessionZero"
                            onClick={onMessageSubmit}>Add</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
