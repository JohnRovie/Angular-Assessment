import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  onSubmit() {
    if (this.enteredName.length === 0) {
      alert('dont leave Name blank');
      return;
    }
    // else if (
    //   this.enteredContact.length < 11 ||
    //   this.enteredContact.length > 11
    // ) {
    //   alert('Contact number must be 11 digit');
    //   return;
    // }
    else if (this.enteredEmail.length === 0) {
      alert('dont leave Email blank');
      return;
    } else {
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

      alert('Successfully added a new contact!');
      this.getData();
      this.close.emit();
    }
  }
  getData() {
    this.contactService.getContacts().subscribe((res) => {
      this.contactData = res;
    });
  }
}
