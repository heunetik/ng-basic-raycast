import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Dungeon } from './game/Dungeon';
import { DOCUMENT } from '@angular/common';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ExitPopupComponent } from './exit-popup/exit-popup.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.css']
})
export class DungeonComponent implements OnInit {
  @ViewChild('dungeon', { static: true })

  canvas: ElementRef<HTMLCanvasElement>;
  dungeon: Dungeon;
  gameInterval: any;
  FPS = 50;
  gameStarted = false;
  elapsedTime: number;
  secondsToMinutes = (seconds: number) => Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2);

  constructor(@Inject(DOCUMENT) private document: Document, public dialog: MatDialog) { }

  ngOnInit() {
    this.dungeon = new Dungeon(document, this.canvas.nativeElement);
    this.getDungeonUpdates();
    this.gameStarted = true;
    this.startGameLoop();
    this.document.defaultView.addEventListener('blur', (e: FocusEvent) => {
      if (this.gameStarted && this.gameInterval) {
        this.dungeon.renderFocusLost();
        clearInterval(this.gameInterval);
        this.gameInterval = null;
      }
    });
    this.document.defaultView.addEventListener('keydown', (e: FocusEvent) => {
      if (this.gameStarted && !this.gameInterval) {
        this.startGameLoop();
      }
    });
  }

  restart() {
    this.gameStarted = false;
    this.dungeon = new Dungeon(document, this.canvas.nativeElement);
    this.getDungeonUpdates();
    clearInterval(this.gameInterval);
    this.gameInterval = null;
    this.startGameLoop();
    this.gameStarted = true;
  }

  private startGameLoop(): void {
    this.gameInterval = setInterval(() => {
      this.gameLoop();
    }, 1000 / this.FPS);
  }

  private gameLoop(): void {
    this.dungeon.render();
  }

  private getDungeonUpdates() {
    timer(0, 1000).pipe(takeUntil(this.dungeon.subject)).subscribe(t => this.elapsedTime = t);
    this.dungeon.subject.pipe(distinctUntilChanged()).subscribe((r: boolean) => {
      const dialogRef = this.dialog.open(ExitPopupComponent, {
        panelClass: 'level-finish',
        width: '640px',
        data: this.secondsToMinutes(this.elapsedTime)
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.restart();
        }
      });
    });
  }
}
