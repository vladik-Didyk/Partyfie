import { useAuth } from "./Auth";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "../App.css";
import axios from "axios";

const socket = io.connect("http://localhost:8080/");

export default function SessionPage() {
    const { token } = useAuth();
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [spotifyDevice, setSpotifyDevice] = useState("");
    const [state, setState] = useState({ message: "", name: "" });
    const [chat, setChat] = useState([]);
    const socketRef = useRef();

    const onTextChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

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
        console.log(response);
        if (response.data.tracks.items.length !== 0) {
            setSearchResults(response.data.tracks.items);
        }
    }

    useEffect(() => {
        console.log(spotifyDevice);
        async function fetchSpotifyDevice() {
            const response = await axios.get(
                "https://api.spotify.com/v1/me/player/devices",
                getAuthConfig(token)
            );
            if (response.data.devices) {
                setSpotifyDevice(response.data.devices[0].id);
            }
        }
        fetchSpotifyDevice();
    }, [spotifyDevice, token]);

    useEffect(() => {
        socketRef.current = io.connect("http://localhost:8080");
        socketRef.current.on("message", ({ name, message }) => {
            setChat([...chat, { name, message }]);
        });
        return () => socketRef.current.disconnect();
    }, [chat]);

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
                                <li key={result.id}>
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
                                    onClick={() => {
                                        console.log(result.uri);
                                    }}
                                >
                                    Add to queue
                                </button>
                            </>
                        );
                    })}
                </ul>
            )}
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
            </div>
        </div>
    );
}
