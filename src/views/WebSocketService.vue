<template>
  <div>
    <p v-if="isConnected">WebSocket is connected</p>
    <p v-else>WebSocket is not connected</p>

    <button @click="connectWebSocket">Connect WebSocket</button>
    <button @click="sendMessage">Send Message</button>
    <button @click="closeWebSocket">Close WebSocket</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useWebSocket } from "../utils/webSocketService";

const { isConnected, connect, send, close } = useWebSocket();
const message = ref("");

const connectWebSocket = () => {
  try {
    connect();
  } catch (error) {
    console.error("WebSocket connection error:", error);
  }
};

const sendMessage = () => {
  send(message.value);
};

const closeWebSocket = () => {
  close();
};
</script>
