import {WorkerInterface} from "./WorkerInterface";

export interface UserProfile {
  fullName: string,
  email: string
  worker: WorkerInterface | null,
  role: Role,
  id: number
}

export enum Role {
  NORMAL,
  WORKER
}
