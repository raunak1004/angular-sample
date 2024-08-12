import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../types/user';
import { CommonModule, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalService } from '../../service/Modal/modal.service';
import { ModalComponent } from "../modal/modal.component";
import { EditUserModalComponent } from "../edit-user-modal/edit-user-modal.component";
import { select, Store } from '@ngrx/store';
import {
  fetchAllUsers,
  deleteUser
} from '../../states/users/action';
import {
  getAllUsers,
  getUsersError,
  getLoading
} from '../../states/users/selector';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [NgClass, CommonModule, ModalComponent],
  templateUrl: './user-table.component.html',
})
export class UserTableComponent implements OnInit, OnDestroy {
  // private userService = inject(UserService);
  modalService = inject(ModalService);

  users: User[] = [];
  errorMessage: string | null = null;
  deletingUserId: number | null = null;
  modalContent: any = null;
  title: string = "";
  isLoading: boolean = false;
  
  EditUserModalComponent = EditUserModalComponent;

  store = inject(Store);
  private userSubscription!: Subscription;
  private errorSubscription!: Subscription;
  private loadingSubscription!: Subscription;

  ngOnInit(): void {
    this.isLoading = true;
    // this.userSubscription = this.userService.users.subscribe({
    //   next: (data) => {
    //     this.users = data;
    //     this.isLoading = false;
    //   },
    //   error: (err) => {
    //     this.isLoading = false;
    //     console.error('Error fetching users', err);
    //     this.errorMessage = 'An error occurred while fetching users. Please try again later.';
    //   }
    // });

    this.store.dispatch(fetchAllUsers());

    this.userSubscription = this.store.pipe(select(getAllUsers)).subscribe(users => {
      if (users) {
        this.users = users;
        this.isLoading = false;
      }
    });

    // Subscribe to error state from the store
    this.errorSubscription = this.store.pipe(select(getUsersError)).subscribe(error => {
      if (error) {
        this.isLoading = false;
        this.errorMessage = 'An error occurred while fetching users. Please try again later.';
        console.error('Error fetching users', error);
      }
    });

    // Subscribe to loading state from the store
    this.loadingSubscription = this.store.pipe(select(getLoading)).subscribe(loading => {
      this.isLoading = loading;
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  onDelete(id: number): void {
    this.deletingUserId = id;
    // this.userService.deleteUser(id).subscribe(success => {
    //   if (success) {
    //     this.deletingUserId = null;
    //   }
    //   else alert("Error while deleting user!");
    // });

    this.store.dispatch(deleteUser({ id }));
  }

  openModal(contentComponent: any, user: User) {
    this.modalContent = contentComponent;
    this.title = "Edit User";
    this.modalService.setSelectedUser(user);
  }

  closeModal() {
    this.modalContent = null;
    this.title = "";
  }
}
