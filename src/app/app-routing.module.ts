import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/views/home/home.component';

import { TaskCreateComponent } from './components/task-crud/task-create/task-create.component';
import { TaskUpdateComponent } from './components/task-crud/task-update/task-update.component';
import { TaskDeleteComponent } from './components/task-crud/task-delete/task-delete.component';

const routes: Routes = [{
  path: "",
  component: HomeComponent
},
{
  path: "nova",
  component: TaskCreateComponent
},
{
  path: "editar/:id",
  component: TaskUpdateComponent
},
{
  path: "remover/:id",
  component: TaskDeleteComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
