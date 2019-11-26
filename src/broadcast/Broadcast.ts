"use strict";

export interface BroadcastEvent {
  cmd: string;
  data: any;
}
export type BroadcastEventListener = (event: BroadcastEvent) => void;
class Broadcast {
  private listeners: BroadcastEventListener[] = [];

  private dispatchMessage(cmd: string, data: any) {
    let event = {
      cmd,
      data
    };
    this.listeners.forEach(callback => {
      callback(event);
    });
  }
  message(cmd: string, data: any) {
    this.dispatchMessage(cmd, data);
  }
  subscribe(callback: BroadcastEventListener) {
    this.listeners.push(callback);
  }
  release() {
    this.listeners = [];
  }
  unsubscribe(callback: BroadcastEventListener) {
    let listeners = this.listeners;
    for (let i = listeners.length - 1; i >= 0; i--) {
      if (listeners[i] === callback) {
        listeners.splice(i, 1);
        return;
      }
    }
  }
}

export default Broadcast;
