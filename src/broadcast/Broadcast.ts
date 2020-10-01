'use strict';

export interface BroadcastEvent<T = any> {
  cmd: string;
  data: T;
}
export type BroadcastEventListener<T = any> = (
  event: BroadcastEvent<T>
) => void;
class Broadcast {
  private listeners: BroadcastEventListener[] = [];

  private dispatchMessage<T = any>(cmd: string, data?: T) {
    const event = {
      cmd,
      data,
    };
    this.listeners.forEach(callback => {
      callback(event);
    });
  }
  message<T = any>(cmd: string, data?: T) {
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
