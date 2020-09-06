import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-exit-popup',
    templateUrl: './exit-popup.component.html',
    styleUrls: ['./exit-popup.component.css']
})
export class ExitPopupComponent implements OnInit {
    record: number;
    constructor(public dialogRef: MatDialogRef<ExitPopupComponent>, @Inject(MAT_DIALOG_DATA) public data) {}
    secondsToMinutes = (seconds: number) => Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2);
    ngOnInit() {
        this.record = +localStorage.getItem('rcRecord') || 9999;
        if (this.data < this.record) {
            localStorage.setItem('rcRecord', this.data);
        }
    }
}
