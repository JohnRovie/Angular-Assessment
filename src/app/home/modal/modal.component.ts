import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactListService } from '../../shared/contact-list.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
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
      window.location.reload();
    }
    this.getData();
  }

  getData() {
    this.contactService.getContacts().subscribe((res) => {
      this.contactData = res;
    });
  }
}
