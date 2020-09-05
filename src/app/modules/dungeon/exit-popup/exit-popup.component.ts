import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-exit-popup',
    templateUrl: './exit-popup.component.html',
    styleUrls: ['./exit-popup.component.css']
})
export class ExitPopupComponent {

    constructor(public dialogRef: MatDialogRef<ExitPopupComponent>, @Inject(MAT_DIALOG_DATA) public data) { }
}
