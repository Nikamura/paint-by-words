import React from "react";
import dynamic from "next/dynamic";
import Game from "./game";

const ConnectionProvider = dynamic(
  async () => (await import("./connection")).ConnectionProvider,
  { ssr: false }
);

const GameClient: React.FC = () => {
  return (
    <ConnectionProvider>
      <Game />
    </ConnectionProvider>
  );
};

export default GameClient;
