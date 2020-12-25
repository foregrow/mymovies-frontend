import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExternalApiService } from './services/external-api.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { RoleGuard } from './guards/role.guard';
import { PersonService } from './services/person.service';
import { DatePipe } from '@angular/common';
import { MovietvshowService } from './services/movietvshow.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ExternalApiService,AuthGuard,UserService,PersonService,DatePipe,MovietvshowService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
