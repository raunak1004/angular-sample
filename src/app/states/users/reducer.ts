// reducer.ts
import { createFeature, createReducer, on } from '@ngrx/store';
import {
  fetchAllUsers,
  fetchAllUsersSuccess,
  fetchAllUsersFailure,
  createUser,
  createUserSuccess,
  createUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure
} from './action';
import { UserState } from '../user.state';

const initialState: UserState = {
  users: [],
  error: null,
  loading: false
};

const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,

    on(fetchAllUsers, state => ({
      ...state,
      loading: true,
      error: null
    })),

    on(fetchAllUsersSuccess, (state, { users }) => ({
      ...state,
      users,
      loading: false
    })),

    on(fetchAllUsersFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    on(createUser, state => ({
      ...state,
      loading: true,
      error: null
    })),

    on(createUserSuccess, (state, { user }) => ({
      ...state,
      users: [...state.users, user],
      loading: false
    })),

    on(createUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    on(updateUser, state => ({
      ...state,
      loading: true,
      error: null
    })),

    on(updateUserSuccess, (state, { user }) => ({
      ...state,
      users: state.users.map(u => u.id === user.id ? user : u),
      loading: false
    })),

    on(updateUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    on(deleteUser, state => ({
      ...state,
      loading: true,
      error: null
    })),

    on(deleteUserSuccess, (state, { id }) => ({
      ...state,
      users: state.users.filter(user => user.id !== id),
      loading: false
    })),

    on(deleteUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    }))
  )
});

export const { name: userFeatureKey, reducer: userReducer } = userFeature;
