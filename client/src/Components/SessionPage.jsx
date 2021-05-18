import { useAuth } from "./Auth";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import audioFile from "../test.mp3";
import "../App.css";
import axios from "axios";

// const socket = io.connect("http://localhost:8080/");

const audio = new Audio();

export default function SessionPage() {
  const { token } = useAuth();
  const [role, setRole] = useState("");
  const [playing, setPlaying] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [spotifyDevice, setSpotifyDevice] = useState("");

  // useEffect(() => {
  //   function reciveMessage(m) {
  //     console.log(m);
  //     if (role === "server") {
  //       audio.src = m.path;
  //       audio.play();
  //     }
  //     setPlaying(m.name);
  //   }

  //   function stopAudio() {
  //     setPlaying("");
  //   }

  //   socket.on("play", reciveMessage);
  //   socket.on("stop", stopAudio);

  //   return () => {
  //     socket.off("play", reciveMessage);
  //     socket.off("stop", stopAudio);
  //   };
  // }, [role]);
  // useEffect(() => {
  //   function handleAudioStop() {
  //     socket.emit("stop");
  //   }
  //   audio.addEventListener("pause", handleAudioStop);

  //   return () => {
  //     audio.removeEventListener("pause", handleAudioStop);
  //   };
  // }, []);

  // function handlePlaySound() {
  //   socket.emit("play", { name: "Test sound 1", path: audioFile });
  // }

  function getAuthConfig(token) {
      return {
          headers: {
              Authorization: 'Bearer ' + token,
          }
      };
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    if (searchText.length === 0) {
      return;
    }
    searchText.replace(" ", "%20");
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${searchText}&type=track&limit=5&offset=0`, getAuthConfig(token));
    console.log(response);
    if (response.data.tracks.items.length !== 0) {
      setSearchResults(response.data.tracks.items);
    }
  }

  useEffect(() => {
    console.log(spotifyDevice);
    async function fetchSpotifyDevice() {
      const response = await axios.get("https://api.spotify.com/v1/me/player/devices", getAuthConfig(token));
      if (response.data.devices) {
        setSpotifyDevice(response.data.devices[0].id);
      }
    }
    fetchSpotifyDevice();
  }, [spotifyDevice, token]);

  return (
    <div className="sessionp">
      <form onSubmit={(event) => handleOnSubmit(event)}>
        <label htmlFor="spotify-search"></label>
        <input type="text" id="spotify-search" onChange={(event) => setSearchText(event.target.value)}/>
        <button type="submit">Search</button>
      </form>
      {searchResults && <ul>
        {searchResults.map((result) => {
          return <>
            <li key={result.id}><iframe title={result.uri} src={`https://open.spotify.com/embed/track/${result.id}`} width="300" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe></li>
            <button onClick={() => {
              console.log(result.uri)
            }}>Add to queue</button>
          </>
        })}
      </ul>}
      
      {/* <h1>Session Page</h1>
      <h1>Soundbot</h1>
      <div className="sound-bot-card">
        <h4>Role</h4>
        <button onClick={() => setRole("client")}>Client</button>
        <button onClick={() => setRole("server")}>Server</button>
      </div>
      <div>
        <h4>Choose sound</h4>
        <button onClick={handlePlaySound}>Play sound!</button>
      </div>
      <div>
        <h4>Playing {playing}</h4>
      </div> */}
    </div>
  );
}
