import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';

const modules = [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatRippleModule
];

@NgModule({
    imports: [...modules],
    exports: [...modules]
})

export class MaterialModule { }
