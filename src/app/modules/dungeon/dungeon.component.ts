import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Dungeon } from './game/Dungeon';

@Component({
  selector: 'app-dungeon',
  templateUrl: './dungeon.component.html',
  styleUrls: ['./dungeon.component.css']
})
export class DungeonComponent implements OnInit {
  @ViewChild('dungeon', { static: true })

  canvas: ElementRef<HTMLCanvasElement>;
  dungeon: Dungeon;

  constructor() { }

  ngOnInit() {
    this.dungeon = new Dungeon(this.canvas.nativeElement);
    this.dungeon.render();
  }
}
