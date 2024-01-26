// composition/WebSocketComposition.js

import { ref } from "vue";

class WebSocketService {
  constructor() {
    this.websocket = null;
    this.isConnected = ref(false);
  }

  connect() {
    const wsUrl = `ws://${window.location.hostname}:3000`;

    this.websocket = new WebSocket(wsUrl);

    this.websocket.addEventListener("open", () => {
      console.log("WebSocket connected");
      this.isConnected.value = true;
    });

    this.websocket.addEventListener("message", (event) => {
      console.log("Received message:", event.data);
      // 处理接收到的消息
    });

    this.websocket.addEventListener("close", () => {
      console.log("WebSocket closed");
      this.isConnected.value = false;
    });

    this.websocket.addEventListener("error", (error) => {
      console.error("WebSocket Error:", error);
    });
  }

  send(message) {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(message);
    } else {
      console.error("WebSocket is not open");
    }
  }

  close() {
    if (this.websocket) {
      this.websocket.close();
    }
  }
}

export function useWebSocket() {
  const webSocketService = new WebSocketService();

  return {
    isConnected: webSocketService.isConnected,
    connect: webSocketService.connect.bind(webSocketService),
    send: webSocketService.send.bind(webSocketService),
    close: webSocketService.close.bind(webSocketService)
  };
}
