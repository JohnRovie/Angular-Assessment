import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Output() close = new EventEmitter<void>();
  enteredName = '';
  enteredContact = '';
  enteredEmail = '';

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    console.log(this.enteredName, this.enteredContact, this.enteredEmail);
    this.close.emit();
    alert('Successfully added a new contact!');
  }
}
