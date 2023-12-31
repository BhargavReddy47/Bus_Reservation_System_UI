import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpComponent } from './Authentication/sign-up/sign-up.component';
import { MainContentComponent } from './main-content/main-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Authentication/login/login.component';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { ShowTicketComponent } from './show-ticket/show-ticket.component';
import { HttpClientModule } from '@angular/common/http';
import { SchedulesComponent } from './schedules/schedules.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignUpComponent,
    MainContentComponent,
    LoginComponent,
    ProfileComponent,
    ShowTicketComponent,
    SchedulesComponent,
    SidebarComponent,
    SearchComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
