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
                    {name}: <span>{message}</span>
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
      \
        const response = await axios.post(`http://localhost:8080/session/${sessionId}/queue`, { uri });
        if (response.data.queue) {

            setQueue(response.data.queue);
        }
    }

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
        return () => socketRef.current.disconnect();
    }, [chat]);



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

                </div>

                <div className="card">
                    <div>
                        <Player token={token} trackUri={playingTrack?.uri} />
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
