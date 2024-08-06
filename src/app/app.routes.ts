import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { InformationViewComponent } from './home/information-view/information-view.component';
import { CardViewComponent } from './home/card-view/card-view.component';
import { TableViewComponent } from './home/table-view/table-view.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'information-view/:id', component: InformationViewComponent },
  { path: 'card-view', component: CardViewComponent },
  { path: 'table-view', component: TableViewComponent },
  { path: '404', component: PagenotfoundComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];
