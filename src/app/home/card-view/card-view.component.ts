import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { Contacts } from '../../shared/contact-list.model';
import { ContactListService } from '../../shared/contact-list.service';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    ModalComponent,
    FormsModule,
  ],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.css',
})
export class CardViewComponent implements OnInit {
  @Input({ required: true }) contact!: Contacts;
  @Output() close = new EventEmitter<void>();
  contactData: any;
  enteredName = '';
  enteredContact = '';
  enteredEmail = '';
  contactInfo!: Contacts;
  isEdit: boolean = false;
  contactHolder: any;
  cont: any;
  route: any;

  constructor(private contactList: ContactListService) {}

  ngOnInit(): void {
    this.cont = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  showEditForm() {
    this.isEdit = true;
  }
  onClose() {
    this.isEdit = false;
  }

  removeContact(data: Contacts) {
    this.contactList
      .removeContact(data.id)
      .pipe(
        map((res: any) => {
          return res;
        })
      )
      .subscribe((res: any) => {
        this.contactData = res.id;
        console.log(res);
        this.getData();
      });
  }

  updateContact(data: Contacts) {
    this.contactHolder.id = data.id;
    console.log(this.contactHolder);

    this.getData();
  }

  onSubmit(formData: NgForm) {
    {
      this.contactList
        .postContacts({
          name: this.enteredName,
          contact: this.enteredContact,
          email: this.enteredEmail,
        })
        .subscribe((res) => {
          console.log(res);
          this.contactList.getContacts();
        });
      this.close.emit();
      window.location.reload();
    }
    this.getData();
  }

  getData() {
    this.contactList.getContacts().subscribe((res) => {
      this.contactData = res;
    });
  }
}
