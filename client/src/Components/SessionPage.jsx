import { useAuth } from "./Auth";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "../App.css";
import axios from "axios";
import Player from "../Components/player/Player"

export default function SessionPage() {
    const { token } = useAuth();
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [spotifyDevice, setSpotifyDevice] = useState("");
    const [state, setState] = useState({ message: "", name: "" });
    const [chat, setChat] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [queue, setQueue] = useState([]);
    const [username, setUsername] = useState("");
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
        event.preventDefault();
        if (searchText.length === 0) {
            return;
        }
        searchText.replace(" ", "%20");
        const response = await axios.get(
            `https://api.spotify.com/v1/search?q=${searchText}&type=track&limit=5&offset=0`,
            getAuthConfig(token)
        );
        if (response.data.tracks.items.length !== 0) {
            setSearchResults(response.data.tracks.items);
        }
    }

    async function handleOnAddQueue(uri) {
        await axios.post(`http://localhost:8080/session/${sessionId}/queue`, {uri});
        socketRef.current.emit("song_queued", uri);
        const uriSplit = uri.split(":");
        await axios.post(`https://api.spotify.com/v1/me/player/queue?uri=${uriSplit[0]}%3A${uriSplit[1]}%3A${uriSplit[2]}&device_id=${spotifyDevice}`, {}, getAuthConfig(token));
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
            if (token){
                const response = await axios.get(
                    "https://api.spotify.com/v1/me/player/devices",
                    getAuthConfig(token)
                );
                if (response.data.devices.length !== 0) {
                    setSpotifyDevice(response.data.devices[0].id);
                }
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
                if (prev.length === 0) {
                    await axios.post(`https://api.spotify.com/v1/me/player/next?device_id=${spotifyDevice}`, {}, getAuthConfig(token));
                }
                else {
                    let response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing?market=IL', getAuthConfig(token));
                    console.log(response.data);
                    // while (response.data.item.uri !== track) {
                    //     setTimeout(async () => {
                    //         response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing?market=IL', getAuthConfig(token));
                    //     }, 3000);
                    // }
                    // await axios.post(`https://api.spotify.com/v1/me/player/next?device_id=${spotifyDevice}`, {}, getAuthConfig(token));
                }
            } catch (err) {
                console.log(err);
            }
        });
        return () => socketRef.current.disconnect();
    }, [chat, queue, token, spotifyDevice]);

    return (
        <div className="sessionp">
            <form onSubmit={(event) => handleOnSubmit(event)}>
                <label htmlFor="spotify-search"></label>
                <input
                    type="text"
                    id="spotify-search"
                    onChange={(event) => setSearchText(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {searchResults && (
                <ul>
                    {searchResults.map((result) => {
                        return (
                            <>
                                <li key={result.uri}>
                                    <iframe
                                        title={result.uri}
                                        src={`https://open.spotify.com/embed/track/${result.id}`}
                                        width="300"
                                        height="80"
                                        frameBorder="0"
                                        allowtransparency="true"
                                        chooseTrack={chooseTrack}
                                        allow="encrypted-media"
                                    ></iframe>
                                </li>
                                <button
                                    onClick={() => handleOnAddQueue(result.uri)}
                                >
                                    Add to queue
                                </button>
                            </>
                        );
                    })}
                </ul>
            )}
            <div className="queue" style={{ border: "1px solid black"}}>
                <h1>Queue</h1>
                    {queue.map((song) => {
                        return <li key={song}>{song} added by {username}</li>;
                    })}
            </div>
            <div className="card">
                <form onSubmit={onMessageSubmit}>
                    <h1>Messenger</h1>
                    <div className="name-field">
                        <input
                            name="name"
                            onChange={(e) => onTextChange(e)}
                            value={state.name}
                            label="Name"
                        />
                    </div>
                    <div>
                        <input
                            name="message"
                            onChange={(e) => onTextChange(e)}
                            value={state.message}
                            label="Message"
                        />
                    </div>
                    <button>Send Message</button>
                </form>
                <div className="render-chat">
                    <h1>Chat Log</h1>
                    {renderChat()}
                </div>
                <div>
                    <Player token = {token} trackUri={playingTrack?.uri} />
                </div>
            </div>
        </div>
    );
}
