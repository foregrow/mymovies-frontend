import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ExternalApiService } from './services/external-api.service';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ExternalApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
