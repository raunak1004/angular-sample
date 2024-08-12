import { User } from "./user";

export interface UserState {
    users: User[];
    error: string | null;
    loading: boolean;
}