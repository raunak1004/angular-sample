import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/UserService/user-service.service';
import { CommonModule, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalService } from '../../service/Modal/modal.service';
import { ModalComponent } from "../modal/modal.component";
import { EditUserModalComponent } from "../edit-user-modal/edit-user-modal.component";

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [NgClass, CommonModule, ModalComponent],
  templateUrl: './user-table.component.html',
})
export class UserTableComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  modalService = inject(ModalService);
  private userSubscription!: Subscription;

  users: User[] = [];
  errorMessage: string | null = null;

  deletingUserId: number | null = null;

  modalContent: any = null;
  title: string = "";
  isLoading: boolean = false;
  
  EditUserModalComponent = EditUserModalComponent

  ngOnInit(): void {
    this.isLoading = true;
    this.userSubscription = this.userService.users.subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching users', err);
        this.errorMessage = 'An error occurred while fetching users. Please try again later.';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onDelete(id: number): void {
    this.deletingUserId = id;
    this.userService.deleteUser(id).subscribe(success => {
      if (success) {
        this.deletingUserId = null;
      }
      else alert("Error while deleting user!");
    });
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
