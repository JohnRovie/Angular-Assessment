import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactListService } from '../../shared/contact-list.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();
  enteredName = '';
  enteredContact = '';
  enteredEmail = '';
  contactData: any;
  private contactService = inject(ContactListService);

  ngOnInit(): void {
    return this.getData();
  }
  onClose() {
    this.close.emit();
  }
  isSuccess() {
    this.success.emit();
  }

  onSubmit(formData: NgForm) {
    {
      this.contactService
        .postContacts({
          name: this.enteredName,
          contact: this.enteredContact,
          email: this.enteredEmail,
        })
        .subscribe((res) => {
          console.log(res);
          this.contactService.getContacts();
        });
      this.close.emit();
      this.success.emit();
    }
    this.getData();
  }

  getData() {
    this.contactService.getContacts().subscribe((res) => {
      this.contactData = res;
    });
  }
}
