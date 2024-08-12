import { Component } from '@angular/core';
import { UserTableComponent } from '../../components/user-table/user-table.component';
import { AddUserModalComponent } from '../../components/add-user-modal/add-user-modal.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UserTableComponent, ModalComponent, CommonModule],
  templateUrl: './users.component.html'
})
export class UsersComponent {

  modalContent: any = null;
  title: string = '';

  AddUserModalComponent = AddUserModalComponent;

  openModal(contentComponent: any) {
    this.modalContent = contentComponent;
    this.title = "Add User";
  }

  closeModal() {
    this.modalContent = null;
    this.title = '';
  }
}
