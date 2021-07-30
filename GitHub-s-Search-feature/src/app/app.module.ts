import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { SearchComponent } from './pages/search/search.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './pages/users/users.component';
import {SlideMenuModule} from 'primeng/slidemenu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PaginatorModule} from 'primeng/paginator';
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    SlideMenuModule,
    BrowserAnimationsModule,
    PaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
