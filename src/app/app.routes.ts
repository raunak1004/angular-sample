import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    { path: "", title: "Home",  component: HomeComponent },
    { path: "users", title: "Users", component: UsersComponent },
    { path: "**", title: "404 - Page Not Found", component: NotFoundComponent },
];
