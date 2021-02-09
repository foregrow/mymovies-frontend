import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ChannelMoviesComponent } from './components/main/channel-movies/channel-movies.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/admin/users/users.component';
import { GenresComponent } from './components/admin/genres/genres.component';
import { PersonsComponent } from './components/admin/persons/persons.component';
import { EpisodesComponent } from './components/admin/episodes/episodes.component';
import { SeasonsComponent } from './components/admin/seasons/seasons.component';
import { MtsComponent } from './components/admin/mts/mts.component';
import { ErrorComponent } from './components/error/error.component';
import { PersondetailComponent } from './components/admin/persons/persondetail/persondetail.component';
import { MtsdetailComponent } from './components/admin/mts/mtsdetail/mtsdetail.component';
import { SeasondetailComponent } from './components/admin/seasons/seasondetail/seasondetail.component';
import { EpisodedetailComponent } from './components/admin/episodes/episodedetail/episodedetail.component';
import { SearchDetailsComponent } from './components/main/search-details/search-details.component';
import { DetailsComponent } from './components/main/details/details.component';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"admin", component:AdminComponent, canActivate:[AuthGuard,RoleGuard],
  data: {
      roles: ['ADMIN']
    },
  children: [
    {path:"users", component:UsersComponent},

    {path:"persons", component:PersonsComponent},
    {path:"person-detail/:p", component:PersondetailComponent},

    {path:"seasons", component:SeasonsComponent},
    {path:"season-detail/:p", component:SeasondetailComponent},
    {path:"episodes", component:EpisodesComponent},
    {path:"episode-detail/:p", component:EpisodedetailComponent},

    {path:"moviestvshows", component:MtsComponent},
    {path:"movietvshow-detail/:p", component:MtsdetailComponent},
    {path:"genres", component:GenresComponent},
  ]},
  {path:"main", component:MainComponent, canActivate:[AuthGuard,RoleGuard],
  data: {
      roles: ['USER']
    },
  },
  {path:"details/:p/:id", component:DetailsComponent, canActivate:[AuthGuard,RoleGuard],
  data: {
      roles: ['USER']
    },
  },
  {path:"channels-movies", component:ChannelMoviesComponent, canActivate:[AuthGuard,RoleGuard],
  data: {
      roles: ['USER']
    },
  },

  {path: 'error', component:ErrorComponent},
  {path: '**', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
export const routingComponents = [ErrorComponent,LoginComponent,AdminComponent,MainComponent,ChannelMoviesComponent,RegisterComponent,
UsersComponent,GenresComponent,SeasonsComponent,EpisodesComponent,PersonsComponent,PersondetailComponent,MtsComponent,MtsdetailComponent,
SeasondetailComponent,EpisodedetailComponent,SearchDetailsComponent,DetailsComponent]