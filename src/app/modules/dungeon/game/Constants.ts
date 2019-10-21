export class Constants  {
    height: number;
    width: number;
    halfHeight: number;
    halfWidth: number;

    constructor(canvas: HTMLCanvasElement) {
        this.height = canvas.height;
        this.width = canvas.width;
        this.halfHeight = this.height / 2;
        this.halfWidth = this.width / 2;
    }
}
