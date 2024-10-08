// actions.ts
import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../types/user';

export const userAction = createActionGroup({
  source: 'User',
  events: {
    'Fetch All Users': emptyProps(),
    'Fetch All Users Success': props<{ users: User[] }>(),
    'Fetch All Users Failure': props<{ error: any }>(),

    'Create User': props<{ user: User }>(),
    'Create User Success': props<{ user: User }>(),
    'Create User Failure': props<{ error: any }>(),
    
    'Update User' : props<{ user: User }>(),
    'Update User Success': props<{ user: User }>(),
    'Update User Failure': props<{ error: any }>(),

    'Delete User': props<{ id: number }>(),
    'Delete User Success': props<{ id: number }>(),
    'Delete User Failure': props<{ error: any }>()
  }
});

// export const fetchAllUsers = createAction('[User] Fetch All Users');
// export const fetchAllUsersSuccess = createAction(
//   '[User] Fetch All Users Success',
//   props<{ users: User[] }>()
// );
// export const fetchAllUsersFailure = createAction(
//   '[User] Fetch All Users Failure',
//   props<{ error: any }>()
// );

// export const createUser = createAction(
//   '[User] Create User',
//   props<{ user: User }>()
// );
// export const createUserSuccess = createAction(
//   '[User] Create User Success',
//   props<{ user: User }>()
// );
// export const createUserFailure = createAction(
//   '[User] Create User Failure',
//   props<{ error: any }>()
// );

// export const updateUser = createAction(
//   '[User] Update User',
//   props<{ user: User }>()
// );
// export const updateUserSuccess = createAction(
//   '[User] Update User Success',
//   props<{ user: User }>()
// );
// export const updateUserFailure = createAction(
//   '[User] Update User Failure',
//   props<{ error: any }>()
// );

// export const deleteUser = createAction(
//   '[User] Delete User',
//   props<{ id: number }>()
// );
// export const deleteUserSuccess = createAction(
//   '[User] Delete User Success',
//   props<{ id: number }>()
// );
// export const deleteUserFailure = createAction(
//   '[User] Delete User Failure',
//   props<{ error: any }>()
// );
