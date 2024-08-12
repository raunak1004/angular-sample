import { User } from "../types/user";

export interface UserState {
    users: User[];
    error: string | null;
    loading: boolean;
}