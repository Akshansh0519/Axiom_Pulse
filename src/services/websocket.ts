// 'use client';

// import { PriceUpdate } from '@/types/token';

// export class WebSocketMock {
//   private ws: WebSocket | null = null;
//   private reconnectAttempts = 0;
//   private maxReconnectAttempts = 5;
//   private reconnectDelay = 3000;
//   private onMessageCallback: ((update: PriceUpdate) => void) | null = null;
//   private onConnectionChange: ((connected: boolean) => void) | null = null;
//   private heartbeatInterval: NodeJS.Timeout | null = null;

//   constructor(
//     private url: string = 'wss://mock-realtime-server.example.com/prices'
//   ) {}

//   connect() {
//     try {
//       // In development, we'll use a mock implementation
//       if (process.env.NODE_ENV === 'development') {
//         this.startMockUpdates();
//         this.onConnectionChange?.(true);
//         return;
//       }

//       this.ws = new WebSocket(this.url);

//       this.ws.onopen = () => {
//         console.log('✅ WebSocket connected');
//         this.reconnectAttempts = 0;
//         this.onConnectionChange?.(true);
//         this.startHeartbeat();
//       };

//       this.ws.onmessage = (event) => {
//         try {
//           const update: PriceUpdate = JSON.parse(event.data);
//           this.onMessageCallback?.(update);
//         } catch (error) {
//           console.error('Failed to parse WebSocket message:', error);
//         }
//       };

//       this.ws.onerror = (error) => {
//         console.error('WebSocket error:', error);
//       };

//       this.ws.onclose = () => {
//         console.log('WebSocket disconnected');
//         this.onConnectionChange?.(false);
//         this.stopHeartbeat();
//         this.attemptReconnect();
//       };
//     } catch (error) {
//       console.error('Failed to connect WebSocket:', error);
//       this.attemptReconnect();
//     }
//   }

//   disconnect() {
//     if (this.ws) {
//       this.ws.close();
//       this.ws = null;
//     }
//     this.stopHeartbeat();
//     this.stopMockUpdates();
//   }

//   onMessage(callback: (update: PriceUpdate) => void) {
//     this.onMessageCallback = callback;
//   }

//   onConnectionStatusChange(callback: (connected: boolean) => void) {
//     this.onConnectionChange = callback;
//   }

//   private attemptReconnect() {
//     if (this.reconnectAttempts < this.maxReconnectAttempts) {
//       this.reconnectAttempts++;
//       console.log(
//         `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
//       );
//       setTimeout(() => this.connect(), this.reconnectDelay);
//     } else {
//       console.error('Max reconnection attempts reached');
//     }
//   }

//   private startHeartbeat() {
//     this.heartbeatInterval = setInterval(() => {
//       if (this.ws?.readyState === WebSocket.OPEN) {
//         this.ws.send(JSON.stringify({ type: 'ping' }));
//       }
//     }, 30000); // 30 seconds
//   }

//   private stopHeartbeat() {
//     if (this.heartbeatInterval) {
//       clearInterval(this.heartbeatInterval);
//       this.heartbeatInterval = null;
//     }
//   }

//   // Mock implementation for development
//   private mockInterval: NodeJS.Timeout | null = null;
//   private mockTokenIds: string[] = [];

//   setMockTokenIds(ids: string[]) {
//     this.mockTokenIds = ids;
//   }

//   private startMockUpdates() {
//     this.mockInterval = setInterval(() => {
//       if (this.mockTokenIds.length === 0) return;

//       // Randomly select a token to update
//       const randomId = this.mockTokenIds[Math.floor(Math.random() * this.mockTokenIds.length)];
      
//       // Generate realistic price change (-5% to +5%)
//       const priceChangePercent = (Math.random() - 0.5) * 10;
//       const currentPrice = Math.random() * 1000; // Mock base price
//       const newPrice = currentPrice * (1 + priceChangePercent / 100);

//       const update: PriceUpdate = {
//         id: randomId,
//         pairAddress: `0x${randomId}`,
//         priceUsd: newPrice.toFixed(8),
//         priceChange: {
//           m5: (Math.random() - 0.5) * 5,
//           h1: (Math.random() - 0.5) * 10,
//         },
//         timestamp: Date.now(),
//       };

//       this.onMessageCallback?.(update);
//     }, 2000); // Update every 2 seconds
//   }

//   private stopMockUpdates() {
//     if (this.mockInterval) {
//       clearInterval(this.mockInterval);
//       this.mockInterval = null;
//     }
//   }
// }

// // Singleton instance
// let wsInstance: WebSocketMock | null = null;

// export function getWebSocketInstance(): WebSocketMock {
//   if (!wsInstance) {
//     wsInstance = new WebSocketMock();
//   }
//   return wsInstance;
// }

import { PriceUpdate } from '@/types/token';

class TokenWebSocketService {
  private mockTokenIds: string[] = [];
  private updateInterval: NodeJS.Timeout | null = null;
  private messageCallback: ((update: PriceUpdate) => void) | null = null;
  private statusCallback: ((connected: boolean) => void) | null = null;
  private isActive = false;

  setMockTokenIds(ids: string[]) {
    this.mockTokenIds = ids;
  }

  onMessage(callback: (update: PriceUpdate) => void) {
    this.messageCallback = callback;
  }

  onConnectionStatusChange(callback: (connected: boolean) => void) {
    this.statusCallback = callback;
  }

  connect() {
    if (this.isActive) return;
    
    this.isActive = true;
    this.statusCallback?.(true);

    // Simulate real-time updates every 2-3 seconds
    this.updateInterval = setInterval(() => {
      this.generatePriceUpdate();
    }, 2500);
  }

  disconnect() {
    this.isActive = false;
    this.statusCallback?.(false);
    
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  private generatePriceUpdate() {
    if (this.mockTokenIds.length === 0 || !this.messageCallback) return;

    // Pick 3-5 random tokens to update
    const numUpdates = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < numUpdates; i++) {
      const randomId = this.mockTokenIds[Math.floor(Math.random() * this.mockTokenIds.length)];
      
      // Generate realistic price change (-5% to +5%)
      const priceChangePercent = (Math.random() - 0.5) * 10;
      
      // More likely to have small changes
      const m5Change = (Math.random() - 0.5) * 3;
      const h1Change = (Math.random() - 0.5) * 5;

      const update: PriceUpdate = {
        id: randomId,
        priceUsd: (Math.random() * 100).toFixed(4),
        priceChange: {
          m5: (Math.random() - 0.5) * 10,
          h1: (Math.random() - 0.5) * 15,
          h6: (Math.random() - 0.5) * 20,   
          h24: (Math.random() - 0.5) * 25,  
        },
        timestamp: Date.now(),
      };

      this.messageCallback(update);
    }
  }
}

let instance: TokenWebSocketService | null = null;

export function getWebSocketInstance(): TokenWebSocketService {
  if (!instance) {
    instance = new TokenWebSocketService();
  }
  return instance;
}

