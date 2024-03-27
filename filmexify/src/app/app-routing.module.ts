import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';
import { ManagerComponent } from './manager/manager.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'manager',
    component: ManagerComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
