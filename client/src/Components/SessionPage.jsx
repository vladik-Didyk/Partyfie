import { useAuth } from "./Auth";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import audioFile from "../test.mp3";
import "../App.css";
import MusicBar from './Music/MusicBar/MusicBar'

const socket = io.connect("http://localhost:8080/");

const audio = new Audio();

export function SessionPage() {
  const { token } = useAuth();
  const [role, setRole] = useState("");
  const [playing, setPlaying] = useState(null);
  const [musicOn, setMusicOn] = useState(false);
  const [current_Music, setCurrent_Music] = useState(null)
  const [musicBar, setMusicBar] = useState(false)


  const audio_ = new Audio(current_Music);
  
  useEffect(() => {
    //setCurrent_Music(m.path)
    function reciveMessage(m) {
      console.log(m);
      if (role === "server") {
        setMusicBar(true)
        audio.src = m.path;
       // audio.play();
        setCurrent_Music(m)
      }
      setPlaying(m.name);
    }

    function stopAudio() {
      setPlaying(null);
    }

    socket.on("play", reciveMessage);
    socket.on("stop", stopAudio);

    return () => {
      socket.off("play", reciveMessage);
      socket.off("stop", stopAudio);
    };

  }, [role]);

  useEffect(() => {
    function handleAudioStop() {
      socket.emit("stop");
    }
    audio.addEventListener("pause", handleAudioStop);

    return () => {
      audio.removeEventListener("pause", handleAudioStop);
    };
  }, []);
  
  function handlePlaySound() {
    const music = { name: "Test",  path: audioFile , 
    img: 'Test_good1',
    description: 'ok_Test',
    _id: 222111,
    timeOfSong: '2:33',
  }
    socket.emit("play", music);
    setMusicOn(true)
  
   
  }
  function handlePlauseSound() {
  audio.pause()
  setMusicOn(false)
  
  }


  return (
    <div className="sessionp">
      <h1>Session Page</h1>
      {/* <h1>Soundbot</h1> */}
     
      <div className="sound-bot-card">
        <h4>Role</h4>
        <button onClick={() => setRole("client")}>Client</button>
        <button onClick={() => setRole("server")}>Server</button>
      </div>
      <div>
        <h4>Choose sound</h4>
       { !musicOn 
        ? <button onClick={handlePlaySound}>Play sound!</button> 
        : <button onClick={handlePlauseSound}>Pause sound!</button> 
      } 
      </div>
      <div>
        {musicBar && <MusicBar {...current_Music} />}
      </div>
      <div>
        {/* <h4>Playing {playing}</h4> */}
      </div>
    </div>
  );
}
