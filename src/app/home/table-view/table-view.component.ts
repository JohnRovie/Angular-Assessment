import { Component, signal } from '@angular/core';
import { Contacts } from '../../shared/contact-list.model';
import { ContactListService } from '../../shared/contact-list.service';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { map } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FormsModule],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css',
})
export class TableViewComponent {
  contactData: any;
  cont: any;
  formValue!: FormGroup;
  contactHolder: any;
  isEdit: boolean = false;
  enteredName = '';
  enteredContact = '';
  enteredEmail = '';

  constructor(
    private contactList: ContactListService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      city: ['', Validators.required],
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
        window.location.href = '/table-view';
      });
  }

  getData() {
    this.contactList.getContacts().subscribe((res) => {
      this.contactData = res;
    });
  }
}
