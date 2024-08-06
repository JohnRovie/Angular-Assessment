import { Component, Input, signal } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ContactListService } from '../../shared/contact-list.service';
import { Contacts } from '../../shared/contact-list.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-information-view',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './information-view.component.html',
  styleUrl: './information-view.component.css',
})
export class InformationViewComponent {
  contactData: any;
  @Input({ required: true }) contact!: Contacts;
  cont: any;

  constructor(
    private contactList: ContactListService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cont = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  getData() {
    this.contactList.getContacts().subscribe({
      next: (res: Contacts[]) => {
        return (this.contactData = res);
      },
    });
  }
}
