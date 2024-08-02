import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PagenotfoundComponent },
];
