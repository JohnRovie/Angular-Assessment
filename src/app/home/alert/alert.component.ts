import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  @Output() success = new EventEmitter<void>();

  isSuccess() {
    this.success.emit();
  }
}
