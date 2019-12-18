export interface TrackerStatus {
  [propName: string]: boolean;
}

export interface TrackerEvent {
  resolve: Promise.resolve;
  reject: Promise.reject;
}

export interface TrackerEvents {
  [eventName: string]: TrackerEvent[];
}

export class Tracker {
  public get(name: string): boolean;

  public set(name: string): void;

  public unset(name?: string): void;

  public wait(name: string): Promise<void>;
}
