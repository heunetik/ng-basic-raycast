import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DungeonComponent } from './dungeon.component';
import { MaterialModule } from '../material/material.module';
import { ExitPopupComponent } from './exit-popup/exit-popup.component';



@NgModule({
  declarations: [
    DungeonComponent,
    ExitPopupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  entryComponents: [ExitPopupComponent]
})
export class DungeonModule { }
