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
import { SearchUserComponent } from './components/search-user/search-user.component';
import {MatListItem, MatNavList} from "@angular/material/list";
import { WorkerComponent } from './components/worker/worker.component';
import { BecomeWorkerComponent } from './components/become-worker/become-worker.component';
import {MatPaginator} from "@angular/material/paginator";
import {MatSlider} from "@angular/material/slider";



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
    RegisterComponent,
    SearchUserComponent,
    WorkerComponent,
    BecomeWorkerComponent
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
    MatCardActions,
    MatNavList,
    MatListItem,
    MatPaginator,
    MatSlider
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
