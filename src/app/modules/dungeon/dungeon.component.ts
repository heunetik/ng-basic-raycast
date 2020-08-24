import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { Dungeon } from './game/Dungeon';
import { DOCUMENT } from '@angular/common';

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

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.dungeon = new Dungeon(document, this.canvas.nativeElement);
    this.startGameLoop();
  }

  private startGameLoop(): void {
    this.gameInterval = setInterval(() => {
      this.gameLoop();
    }, 1000 / this.FPS);
  }

  private gameLoop(): void {
    this.dungeon.render();
  }
}
