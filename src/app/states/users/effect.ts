// effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../service/UserService/user-service.service';
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
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UsersEffect {

  private action$ = inject(Actions);
  private userService = inject(UserService);

  loadUsers$ = createEffect(() => this.action$.pipe(
    ofType(fetchAllUsers),
    mergeMap(() => this.userService.getAllUsers().pipe(
      map(users => fetchAllUsersSuccess({ users })),
      catchError(error => of(fetchAllUsersFailure({ error })))
    ))
  ));

  createUser$ = createEffect(() => this.action$.pipe(
    ofType(createUser),
    mergeMap(({ user }) => this.userService.createUser(user).pipe(
      map(createdUser => createUserSuccess({ user: createdUser })),
      catchError(error => of(createUserFailure({ error })))
    ))
  ));

  updateUser$ = createEffect(() => this.action$.pipe(
    ofType(updateUser),
    mergeMap(({ user }) => this.userService.updateUser(user).pipe(
      map(updatedUser => updateUserSuccess({ user: updatedUser })),
      catchError(error => of(updateUserFailure({ error })))
    ))
  ));

  deleteUser$ = createEffect(() => this.action$.pipe(
    ofType(deleteUser),
    mergeMap(({ id }) => this.userService.deleteUser(id).pipe(
      map(() => deleteUserSuccess({ id })),
      catchError(error => of(deleteUserFailure({ error })))
    ))
  ));
}
