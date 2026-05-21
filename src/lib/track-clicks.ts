// lib/track-click.ts
type ClickData = {
  button: string;
  path?: string;
  extra?: Record<string, any>;
  time?: number;
  screenWidth?: number;
  screenHeight?: number;
};

class ClickTracker {
  private queue: ClickData[] = [];
  private isSending = false;
  private readonly BATCH_SIZE = 5;
  private readonly MAX_QUEUE_SIZE = 50;

  constructor() {
    if (typeof window !== "undefined") {
      this.setupAutoFlush();
    }
  }

  track(buttonName: string, extraData: Record<string, any> = {}) {
    if (typeof window === "undefined") return;

    const clickData: ClickData = {
      button: buttonName,
      path: window.location.pathname,
      extra: extraData,
      time: Date.now(),
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
    };

    this.queue.push(clickData);

    if (this.queue.length >= this.BATCH_SIZE) {
      this.flush();
    }

    if (this.queue.length > this.MAX_QUEUE_SIZE) {
      this.queue = this.queue.slice(-this.MAX_QUEUE_SIZE);
    }
  }

  async flush() {
    if (this.isSending || this.queue.length === 0) return;

    this.isSending = true;
    const batch = [...this.queue];
    this.queue = [];

    try {
      await fetch("/api/track-clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(batch),
        keepalive: true,
      });
    } catch (error) {
      console.debug("Analytics send failed:", error);
    } finally {
      this.isSending = false;
    }
  }

  private setupAutoFlush() {
    setInterval(() => this.flush(), 30000);
    window.addEventListener("beforeunload", () => {
      if (this.queue.length > 0) {
        navigator.sendBeacon("/api/track-clicks", JSON.stringify(this.queue));
      }
    });
  }
}

const tracker = new ClickTracker();

export const trackClick = (
  buttonName: string,
  extraData: Record<string, any> = {},
) => {
  tracker.track(buttonName, extraData);
};

export const flushClicks = () => tracker.flush();
