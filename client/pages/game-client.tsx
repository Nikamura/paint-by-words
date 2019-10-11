import React from "react";
import dynamic from "next/dynamic"
import GameBoard from "../components/game-board";
import { useConnection } from "./connection";

const ConnectionProvider = dynamic(async () => (await import("./connection")).ConnectionProvider, { ssr: false})

const GameClient: React.FC = () => {
    const connected = useConnection().connected;
    return <ConnectionProvider>
        <div>Status: {connected? "Online" : "Offline"}</div>
        <div>Paint By Words Game Board!</div>
        <GameBoard/>
    </ConnectionProvider>;
};

export default GameClient;
