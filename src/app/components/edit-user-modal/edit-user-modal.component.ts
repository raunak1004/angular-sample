import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ModalService } from '../../service/Modal/modal.service';
import { User } from '../../types/user';
import { UserService } from '../../service/UserService/user-service.service';
import { Store } from '@ngrx/store';
import { updateUser } from '../../states/users/action';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-user-modal.component.html'
})
export class EditUserModalComponent implements OnInit{
  
  modalService = inject(ModalService);
  userService = inject(UserService);
  store = inject(Store);

  user: User | null = null;

  isSubmitting: boolean = false;

  ngOnInit(): void {
    this.user = this.modalService.selectedUser;
  }

  onSubmit(editUserForm: NgForm): void {
    this.isSubmitting = true;
    if (this.user && editUserForm.valid) {
      // this.userService.updateUser(this.user.id, this.user).subscribe(success => {
      //   if (success) {
      //     this.user = { 
      //       id: 0,
      //       name: "",
      //       username: "",
      //       email: "",
      //       address: {
      //         street: "",
      //         suite: "",
      //         city: "",
      //         zipcode: "",
      //         geo: {
      //           lat: "",
      //           lng: "",
      //         }
      //       },
      //       phone: "",
      //       website: "",
      //       company: {
      //         name: "",
      //         catchPhrase: "",
      //         bs: "",
      //       }
      //     };

      //     this.isSubmitting = false;
      //     this.onClose();
      //   } else {
      //     this.isSubmitting = false;
      //     alert("Error while updating user");
      //   }
      // });
      this.store.dispatch(updateUser({ user: this.user }));
      this.onClose();
    } else {
      alert('Form is not valid');
    }
  }

  onClose() {
    this.modalService.triggerClose();
  }

}
