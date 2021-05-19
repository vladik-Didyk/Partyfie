import { useAuth } from "./Auth";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "../App.css";
import axios from "axios";
import SpotifyPlayer from 'react-spotify-web-playback'
import { useParams } from "react-router";

export default function SessionPage() {
    const { token } = useAuth();
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [chatMessage, setChatMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [queue, setQueue] = useState([]);
    const [username, setUsername] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [nextTracks, setNextTracks] = useState([]);
    const socketRef = useRef();
    const params = useParams();
    const sessionId = params.id;

    const chooseTrack = () => {
        setSearchText("")
        setSearchResults([])
    }

    const onMessageSubmit = (e) => {
        socketRef.current.emit("message", { username, chatMessage });
        e.preventDefault();
        setChatMessage("");
    };

    const renderChat = () => {
        return chat.map(({ username, chatMessage }, index) => (
            <div key={index}>
                <h3>
                    {username}: <span>{chatMessage}</span>
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
        //const uriSplit = uri.split(":");
        // chooseTrack(uri);
    }

    async function handlePlayerCallback(state) {
        setIsPlaying(state.isPlaying);
        if (state.status === "INITIALIZING") {
            return;
        }
        const prev = nextTracks;
       
        if (state.nextTracks.length < prev.length) {
            const newQueue = queue.slice(1);
            await axios.put(`http://localhost:8080/session/${sessionId}/queue`, { uri: queue[0] });
            setQueue(newQueue);
        }
        else if (state.nextTracks.length === 0 && !state.isPlaying){
            await axios.put(`http://localhost:8080/session/${sessionId}/queue`, { uri: queue[0] });
            setQueue([]);
        }
        
        setNextTracks(state.nextTracks);
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
        async function fetchSessionQueue() {
            const response = await axios.get(`http://localhost:8080/session/${sessionId}/queue`);
            if (response.data.queue) {
                chooseTrack();
                setQueue(response.data.queue);
                setIsPlaying(true);
            }
        }

        try {
            fetchSessionQueue();
        } catch (err) {
            console.log(err);
        }
        
    }, [token, sessionId]);

    useEffect(() => {
        socketRef.current = io.connect("http://localhost:8080");
        socketRef.current.on("message", ({ username, chatMessage }) => {
            setChat([...chat, { username, chatMessage }]);
        });
        socketRef.current.on("song_queued", async (track) => {
            try {
                const prev = [...queue, track];
                setQueue(prev);
                chooseTrack();
                if (prev.length === 1){
                    setIsPlaying(true);
                }
                chooseTrack();
            } catch (err) {
                console.log(err);
            }
        });
        return () => socketRef.current.disconnect();
    }, [chat, queue, token]);

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
                    <div>
                        <input
                            name="message"
                            onChange={(e) => setChatMessage(e.target.value)}
                            value={chatMessage}
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
                    {/* <Player token={token} uris={queue ? queue : []} /> */}
                    {token && queue && <SpotifyPlayer
                        autoPlay={true}
                        callback={(state) => handlePlayerCallback(state)}
                        token={token}
                        play={isPlaying}
                        uris={queue}
                        showSaveIcon
                    />}
                </div>
            </div>
        </div>
    );
}
