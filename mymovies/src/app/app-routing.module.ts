import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ChannelMoviesComponent } from './components/main/channel-movies/channel-movies.component';
import { ExternalApiService } from './services/external-api.service';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"admin", component:AdminComponent},
  {path:"main", component:MainComponent},
  {path:"channels-movies",component:ChannelMoviesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ExternalApiService]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,AdminComponent,MainComponent,ChannelMoviesComponent]