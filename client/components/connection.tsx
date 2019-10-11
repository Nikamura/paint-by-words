import React, { useState, useEffect } from "react";
import Loading from "./loading";

interface ConnectionContextProps {
  connection?: WebSocket;
  connected: boolean;
}

const ConnectionContext  = React.createContext<ConnectionContextProps>({ connected: false });

const ConnectionProvider: React.FC = props => {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(true);

  let connection: WebSocket | undefined;

  useEffect(() => {
    if (loading) {
      connection = new WebSocket("ws://localhost:8080/");
      connection.onopen = () =>  setConnected(false)
      setLoading(false);
    }
  })

  if (loading) return <Loading/>;
  
  return <ConnectionContext.Provider value={{ connection, connected }} {...props}/>
}

function useConnection() {
  const context = React.useContext(ConnectionContext);
  if (context === undefined) throw new Error("useConnection must be used within a ConnectionProvider");
  return context;
}

export { ConnectionProvider, useConnection }
