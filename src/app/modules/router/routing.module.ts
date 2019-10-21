import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DungeonComponent } from '../dungeon/dungeon.component';

const routes: Routes = [
  { path: '', component: DungeonComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
