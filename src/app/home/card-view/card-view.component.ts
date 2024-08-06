import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contacts } from '../../shared/contact-list.model';
import { ContactListService } from '../../shared/contact-list.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
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
  isEdit: boolean = false;
  contactHolder: any;
  cont: any;
  formValue!: FormGroup;

  constructor(
    private contactList: ContactListService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      contact: ['', Validators.required],
    });
    this.cont = this.route.snapshot.paramMap.get('id');
    this.contactList.getContactsId(this.cont).subscribe((res) => {
      this.contactHolder = res;
    });
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

  updateContact(formData: NgForm) {
    this.contactList
      .updateContacts(this.contactHolder, this.contactHolder.id)
      .subscribe((res) => {
        this.formValue.reset();
        this.getData();
        window.location.href = '/';
      });
  }

  getData() {
    this.contactList.getContacts().subscribe((res) => {
      this.contactData = res;
    });
  }
}
