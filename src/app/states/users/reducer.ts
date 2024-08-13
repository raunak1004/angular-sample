// reducer.ts
import { createFeature, createReducer, on } from '@ngrx/store';
import {
  userAction,
  // fetchAllUsers,
  // fetchAllUsersSuccess,
  // fetchAllUsersFailure,
  // createUser,
  // createUserSuccess,
  // createUserFailure,
  // updateUser,
  // updateUserSuccess,
  // updateUserFailure,
  // deleteUser,
  // deleteUserSuccess,
  // deleteUserFailure,
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

    on(userAction.fetchAllUsers, state => ({
      ...state,
      loading: true,
      error: null
    })),

    on(userAction.fetchAllUsersSuccess, (state, { users }) => ({
      ...state,
      users,
      loading: false
    })),

    on(userAction.fetchAllUsersFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    on(userAction.createUser, state => ({
      ...state,
      loading: true,
      error: null
    })),

    on(userAction.createUserSuccess, (state, { user }) => ({
      ...state,
      users: [...state.users, user],
      loading: false
    })),

    on(userAction.createUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    on(userAction.updateUser, state => ({
      ...state,
      loading: true,
      error: null
    })),

    on(userAction.updateUserSuccess, (state, { user }) => ({
      ...state,
      users: state.users.map(u => u.id === user.id ? user : u),
      loading: false
    })),

    on(userAction.updateUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    on(userAction.deleteUser, state => ({
      ...state,
      loading: true,
      error: null
    })),

    on(userAction.deleteUserSuccess, (state, { id }) => ({
      ...state,
      users: state.users.filter(user => user.id !== id),
      loading: false
    })),

    on(userAction.deleteUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    }))
  )
});

export const { name: userFeatureKey, reducer: userReducer, selectLoading: getLoading, selectError: getUsersError, selectUsers: getAllUsers } = userFeature;
