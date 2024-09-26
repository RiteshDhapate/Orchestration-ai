import { Client } from "@stomp/stompjs";
import { useState } from "react";

const client = new Client();

export const useWebSocket = (brokerURL, subscribeEvent) => {
  const [messages, setMessages] = useState(null);

  client.brokerURL = brokerURL;

  client.onConnect = () => {
    client.subscribe(subscribeEvent, (message) => {
      setMessages(JSON.parse(message.body));
    });
  };

  return { data: messages, isConnected: client.connected, client };
};
