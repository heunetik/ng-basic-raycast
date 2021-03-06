import { DungeonMap } from './Map';
import { Player } from './Player';
import { Raycaster } from './Raycaster';
import { Constants } from './Constants';

export class Dungeon {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private constants: Constants;
    private dungeonMap: DungeonMap;
    private player: Player;
    private raycaster: Raycaster;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');

        this.constants = new Constants(canvas);
        this.dungeonMap = new DungeonMap();
        this.player = new Player();
        this.raycaster = new Raycaster(this.context, this.player, this.dungeonMap, this.constants);
    }

    render() {
        this.raycaster.raycast();
    }
}
