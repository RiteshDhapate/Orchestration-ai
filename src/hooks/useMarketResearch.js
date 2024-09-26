import { useEffect, useState } from 'react';

const useMarketResearch = (setSocketResponseMsg) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Create a new WebSocket connection
    const websocket = new WebSocket('wss://market-research.orchestro.ai/ws');

    // Event handlers for WebSocket
    websocket.onopen = () => {
      console.log('WebSocket connected');
    };

    websocket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    websocket.onmessage = (msg)=>{
      const res = JSON.parse(msg?.data)

      if (res?.type === 'logs') {
        setSocketResponseMsg(prev => ({...prev,
          logs: [...prev?.logs, res?.output]
        }))
      } else if (res?.type === 'report') {
        setSocketResponseMsg(prev => ({...prev,
          reports: [...prev?.reports, res?.output]
        }))
      }
    }

    // Save WebSocket instance in state
    setWs(websocket);

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      websocket.close();
    };
  },[]) 

  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    } else {
      console.error('WebSocket is not open');
    }
  };

  return { sendMessage };
};

export default useMarketResearch;