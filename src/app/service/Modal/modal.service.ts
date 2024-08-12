import { Injectable, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../../types/user';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  selectedUser: User | null = null;

  private closeSubject = new Subject<void>();

  close$ = this.closeSubject.asObservable();

  setSelectedUser(user: User) {
    this.selectedUser = user;
  }

  triggerClose() {
    this.closeSubject.next();
  }
}
