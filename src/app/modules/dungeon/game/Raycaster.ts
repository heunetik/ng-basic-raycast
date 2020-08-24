import { Player } from './Player';
import { DungeonMap } from './Map';
import { Constants } from './Constants';

export class Raycaster {
    context: CanvasRenderingContext2D;
    constants: Constants;
    player: Player;
    map: DungeonMap;
    precision = 32;
    incrementAngle: number;

    constructor(context: CanvasRenderingContext2D, player: Player, map: DungeonMap, constants: Constants) {
        this.context = context;
        this.player = player;
        this.map = map;
        this.constants = constants;
        this.incrementAngle = this.player.fieldOfView / this.constants.width;
    }

    raycast() {
        this.player.update();
        this.context.clearRect(0, 0, this.constants.width, this.constants.height);
        let rayAngle = this.player.facingAngle - this.player.halfFov;
        for (let rayCount = 0; rayCount < this.constants.width; rayCount++) {
            const ray = {
                rayX: this.player.coordX,
                rayY: this.player.coordY
            };

            const rayCos = Math.cos(this.degreeToRadians(rayAngle)) / this.precision;
            const raySin = Math.sin(this.degreeToRadians(rayAngle)) / this.precision;

            let wall: any;
            while (!wall) {
                ray.rayX += rayCos;
                ray.rayY += raySin;
                wall = this.map.mapData[Math.floor(ray.rayY)][Math.floor(ray.rayX)];
            }

            // Pythagoras + Fisheye fix
            let distance = Math.sqrt(Math.pow(this.player.coordX - ray.rayX, 2) + Math.pow(this.player.coordY - ray.rayY, 2));
            distance = distance * Math.cos(this.degreeToRadians(rayAngle - this.player.facingAngle));

            this.drawScenery(rayCount, distance, wall);

            // Increment view angle
            rayAngle += this.incrementAngle;
        }
    }

    private drawScenery(rayCount: number, distance: number, wall: number) {
        const wallHeight = Math.floor(this.constants.halfHeight / distance);
        const wallColor = this.getShaderColor(distance, wall);

        this.drawLine(rayCount, 0, rayCount, this.constants.halfHeight - wallHeight, 'lightblue');
        this.drawLine(rayCount, this.constants.halfHeight - wallHeight, rayCount, this.constants.halfHeight + wallHeight, wallColor);
        this.drawLine(rayCount, this.constants.halfHeight + wallHeight, rayCount, this.constants.height, 'darkolivegreen');
    }

    private drawLine(x1: number, y1: number, x2: number, y2: number, cssColor: string) {
        this.context.strokeStyle = cssColor;
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    private degreeToRadians(degree: number) {
        return degree * Math.PI / 180;
    }

    private getShaderColor(distance: number, wall): string {
        const r = Math.floor(226 - (distance / 15.0) * 255.0);
        const g = Math.floor(166 - (distance / 15.0) * 255.0);
        const b = Math.floor(147 - (distance / 15.0) * 255.0);
        const w = Math.floor(255 - (distance / 15.0) * 255.0);
        if (wall === 2) {
            // tslint:disable-next-line: no-bitwise
            return '#' + ((1 << 24) + (w << 16) + (w << 8) + w).toString(16).slice(1);
        } else {
            // tslint:disable-next-line: no-bitwise
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }
    }
}
