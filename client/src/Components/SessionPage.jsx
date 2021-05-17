import { useAuth } from "./Auth";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import audioFile from "../test.mp3";

const socket = io.connect("http://localhost:8080/");

const audio = new Audio();

export default function SessionPage() {
  const { token } = useAuth();
  const [role, setRole] = useState("");
  const [playing, setPlaying] = useState("");

  useEffect(() => {
    function reciveMessage(m) {
      console.log(m);
      if (role === "server") {
        audio.src = m.path;
        audio.play();
      }
      setPlaying(m.name);
    }

    function stopAudio() {
      setPlaying("");
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
    socket.emit("play", { name: "Test sound 1", path: audioFile });
  }

  return (
    <div classname="sessionp"style={{ color: "white" }}>
      <h1>Session Page</h1>
      <h1>Soundbot</h1>
      <div>
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
      </div>
    </div>
  );
}
