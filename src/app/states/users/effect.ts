// effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../service/UserService/user-service.service';
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
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UsersEffect {

  private action$ = inject(Actions);
  private userService = inject(UserService);

  loadUsers$ = createEffect(() => this.action$.pipe(
    ofType(userAction.fetchAllUsers),
    mergeMap(() => this.userService.getAllUsers().pipe(
      map(users => userAction.fetchAllUsersSuccess({ users })),
      catchError(error => of(userAction.fetchAllUsersFailure({ error })))
    ))
  ));

  createUser$ = createEffect(() => this.action$.pipe(
    ofType(userAction.createUser),
    mergeMap(({ user }) => this.userService.createUser(user).pipe(
      map(createdUser => userAction.createUserSuccess({ user: createdUser })),
      catchError(error => of(userAction.createUserFailure({ error })))
    ))
  ));

  updateUser$ = createEffect(() => this.action$.pipe(
    ofType(userAction.updateUser),
    mergeMap(({ user }) => this.userService.updateUser(user).pipe(
      map(updatedUser => userAction.updateUserSuccess({ user: updatedUser })),
      catchError(error => of(userAction.updateUserFailure({ error })))
    ))
  ));

  deleteUser$ = createEffect(() => this.action$.pipe(
    ofType(userAction.deleteUser),
    mergeMap(({ id }) => this.userService.deleteUser(id).pipe(
      map(() => userAction.deleteUserSuccess({ id })),
      catchError(error => of(userAction.deleteUserFailure({ error })))
    ))
  ));
}
