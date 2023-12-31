import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { MainContentComponent } from './main-content/main-content.component';
import { LoginComponent } from './Authentication/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ShowTicketComponent } from './show-ticket/show-ticket.component';
import { SignUpComponent } from './Authentication/sign-up/sign-up.component';
import { SchedulesComponent } from './schedules/schedules.component';



const routes: Routes = [

  { path: 'Home', component: MainContentComponent,canActivate:[AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,},
  { path: 'profile', component: ProfileComponent,canActivate:[AuthGuard]  },
  { path: 'ticket', component: ShowTicketComponent,canActivate:[AuthGuard]},
  { path: 'signup', component: SignUpComponent, },
  { path: 'schedules', component: SchedulesComponent,canActivate:[AuthGuard]  },

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}