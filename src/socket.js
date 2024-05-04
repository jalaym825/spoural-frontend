// socket.js
import io from 'socket.io-client';

const serverUrl = import.meta.env.VITE_BACKEND_SERVER_URL;
const socket = io(serverUrl, { transports: ["websocket", "pooling"], autoConnect: true, reconnection: false }); // Disable autoConnect initially

// Export a function to manually connect the socket when needed
export const connectSocket = () => {
  socket.connect();
};

// Export the socket instance for event handling
export default socket;