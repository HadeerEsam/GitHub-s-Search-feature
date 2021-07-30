import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path:"search",
    component:SearchComponent
  },
  {
    path:"search/user",
    component:UsersComponent
  },
  {
    path:"",
    redirectTo:"search",
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
