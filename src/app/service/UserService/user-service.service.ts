// import { inject, Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, catchError, from, map, of, switchMap, tap } from 'rxjs';
// import { User } from '../../types/user';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private apiUrl = 'https://jsonplaceholder.typicode.com/users';

//   private userSource = new BehaviorSubject<User[]>([]);
//   users = this.userSource.asObservable();

//   http = inject(HttpClient);

//   constructor() {
//     this.getAllUsers();
//   }

  

//   getAllUsers() {
//     this.http.get<User[]>(this.apiUrl).pipe(
//       catchError(err => {
//         console.error('Error fetching users', err);
//         return of([]);
//       })
//     ).subscribe(users => {
//       this.userSource.next(users);
//     });
//   }

//   getSingleUser(id: number) {
//     return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
//       catchError(err => {
//         console.error('Error fetching user', err);
//         return of(null);
//       })
//     )
//   } 

//   addUser(user: User) {
//     return this.http.post<User>(this.apiUrl, user).pipe(
//       tap(newUser => {
//         this.userSource.next([...this.userSource.value, newUser]);
//       }),
//       map(() => true),
//       catchError(err => {
//         console.error("Error adding user", err);
//         return of(false);
//       })
//     )
//   }

//   updateUser(id: number, payload: any) {
//     return this.http.put(`${this.apiUrl}/${id}`, payload).pipe(
//       tap((updatedUser: any) => {
//         const updatedUsers = this.userSource.value.map(user => 
//           user.id === id ? updatedUser : user
//         );
//         this.userSource.next(updatedUsers);
//       }),
//       catchError(err => {
//         console.error(err);
//         return of(null);
//       })
//     )
//   }

//   deleteUser(id: number) {
//     return this.http.delete<boolean>(`${this.apiUrl}/${id}`).pipe(
//       tap(() => this.userSource.next(this.userSource.value.filter(user => user.id !== id))),
//       map(() => true),
//       catchError(err => {
//         console.error(err);
//         return of(false);
//       })
//     )
//   }
// }


// user-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
