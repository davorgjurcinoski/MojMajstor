import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { AboutComponent } from './components/about/about.component';
import { NgIconsModule } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroUsers } from '@ng-icons/heroicons/outline';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { ServicerComponent } from './components/servicer/servicer.component';
import { LoginComponent } from './components/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatFormField} from "@angular/material/form-field";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { RegisterComponent } from './components/register/register.component';
import {MatOption, MatSelect} from "@angular/material/select";
import {AuthInterceptor} from "./auth.interceptor";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    AboutComponent,
    ProfileComponent,
    ServicerComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgIconsModule.withIcons({featherAirplay, heroUsers}),
    MatFormField,
    NgOptimizedImage,
    MatButton,
    MatInputModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    HttpClientModule,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardActions
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
