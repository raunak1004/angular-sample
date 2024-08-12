import { Component, Input, Output, EventEmitter, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalService } from '../../service/Modal/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  imports: [CommonModule]
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() contentComponent: any;
  @Input() title: string = '';
  @Output() close = new EventEmitter<void>();

  private modalService = inject(ModalService);
  private closeSubscription!: Subscription;

  ngOnInit() {
    this.closeSubscription = this.modalService.close$.subscribe(() => this.onClose());
  }

  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

  get content() {
    return this.contentComponent;
  }

  onClose() {
    this.close.emit();
  }
}
