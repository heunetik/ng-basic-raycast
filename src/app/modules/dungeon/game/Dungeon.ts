import { DungeonMap } from './Map';
import { Player } from './Player';
import { Raycaster } from './Raycaster';
import { Constants } from './Constants';
import { Inject } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

export class Dungeon {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private constants: Constants;
    private dungeonMap: DungeonMap;
    private player: Player;
    private raycaster: Raycaster;
    private textWidth: number;
    private finished = false;
    subject: Subject<boolean>;

    constructor(@Inject(Document) private document: Document, canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.subject = new Subject<boolean>();

        this.constants = new Constants(canvas);
        this.dungeonMap = new DungeonMap();
        this.player = new Player(document, this.dungeonMap.mapData);
        this.player.subject.pipe(distinctUntilChanged()).subscribe((r) => {
            this.finished = r;
            this.pushUpdate(r);
        });
        // @ts-ignore
        this.raycaster = new Raycaster(this.context, this.player, this.dungeonMap, this.constants);
    }

    render() {
        if (!this.finished) {
            this.raycaster.raycast();
        }
    }

    renderFocusLost(): void {
        const focusText = 'THE GAME IS PAUSED. PRESS A KEY TO FOCUS';
        this.textWidth = this.textWidth || this.context.measureText(focusText).width;
        this.context.fillStyle = 'rgba(0,0,0,0.5)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = 'white';
        this.context.font = '18px Lucida Console';
        this.context.fillText(focusText, this.constants.halfWidth - this.textWidth, this.constants.halfHeight);
    }

    private pushUpdate(updatedValue: boolean) {
        this.subject.next(updatedValue);
    }
}
