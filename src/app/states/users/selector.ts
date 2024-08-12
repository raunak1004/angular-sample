// selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../user.state';

const getUserState = createFeatureSelector<UserState>('user');

export const getAllUsers = createSelector(
  getUserState,
  state => state.users
);

export const getUsersError = createSelector(
  getUserState,
  state => state.error
);

export const getLoading = createSelector(
  getUserState,
  state => state.loading
);
