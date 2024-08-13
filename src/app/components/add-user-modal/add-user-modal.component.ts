import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../types/user';
import { UserService } from '../../service/UserService/user-service.service';
import { ModalComponent } from "../modal/modal.component";
import { AsyncPipe, CommonModule } from '@angular/common';
import { ModalService } from '../../service/Modal/modal.service';
import { Store } from '@ngrx/store';
import { userAction } from '../../states/users/action';

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [FormsModule, ModalComponent, AsyncPipe, CommonModule],
  templateUrl: './add-user-modal.component.html'
})
export class AddUserModalComponent {

  userService = inject(UserService);
  modalService = inject(ModalService);
  store = inject(Store);

  isSubmitting: boolean = false;

  user: User = {
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      }
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    }
  };

  onSubmit(addUserForm: NgForm): void {
    this.isSubmitting = true;
    if (addUserForm.valid) {
      // this.userService.addUser(this.user).subscribe(success => {
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
      //     alert("Error while adding user");
      //   }
      // });
      this.store.dispatch(userAction.createUser({ user: this.user}));
      this.onClose();
      
    } else {
      alert('Form is not valid');
    }
  }

  onClose() {
    this.modalService.triggerClose();
  }
}
