import React, { useState, useEffect } from "react";
import Loading from "./loading";
import { Client } from "../lib/client";

interface ConnectionContextProps {
  client: Client;
  connected: boolean;
}

const ConnectionContext = React.createContext<ConnectionContextProps>({
  connected: false,
  client: new Client()
});

const ConnectionProvider: React.FC = props => {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState(new Client());

  useEffect(() => {
    if (loading) {
      client.connect(() => {
        setConnected(true);
      });
      setClient(client);
      setLoading(false);
    }
  }, [client, loading]);

  if (loading) return <Loading />;

  return (
    <ConnectionContext.Provider value={{ client, connected }} {...props} />
  );
};

function useConnection() {
  const context = React.useContext(ConnectionContext);
  if (context === undefined)
    throw new Error("useConnection must be used within a ConnectionProvider");
  return context;
}

export { ConnectionProvider, useConnection };
