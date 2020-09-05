import { Subject } from 'rxjs';

export class Player {
    document: Document;
    fieldOfView = 60;
    halfFov = this.fieldOfView / 2;
    coordX = 2;
    coordY = 2;
    facingAngle = 0;
    movement = 0;
    turn = 0;
    velocity = 0.1;
    turnVelocity = 2;
    mapData: number[][];
    subject: Subject<boolean>;
    finished: boolean;

    constructor(document: Document, mapData: any) {
        this.mapData = mapData;
        this.document = document;
        this.addListeners();
        this.subject = new Subject<boolean>();
    }

    update(): void {
        const newX = this.coordX + (this.movement * Math.cos(this.facingAngle * (Math.PI / 180)) * this.velocity);
        const newY = this.coordY + (this.movement * Math.sin(this.facingAngle * (Math.PI / 180)) * this.velocity);
        this.facingAngle += this.turn * this.turnVelocity;
        if (!this.collision(newX, newY)) {
            this.coordX = newX;
            this.coordY = newY;
        }
    }

    moveForward(): void {
        this.movement = 1;
    }

    moveBack(): void {
        this.movement = -1;
    }

    turnRight(): void {
        this.turn = 1;
    }

    turnLeft(): void {
        this.turn = -1;
    }

    resetMovement(): void {
        this.movement = 0;
    }

    resetTurn(): void {
        this.turn = 0;
    }

    collision(x: number, y: number): boolean {
        const tile = this.mapData[Math.floor(y)][Math.floor(x)];
        if (tile !== 0) {
            if (tile === 2) {
                this.subject.next(true);
            }
            return true;
        }
        return false;
    }

    private addListeners(): void {
        this.document.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.moveForward();
                    break;
                case 'ArrowDown':
                    this.moveBack();
                    break;
                case 'ArrowRight':
                    this.turnRight();
                    break;
                case 'ArrowLeft':
                    this.turnLeft();
                    break;
            }
        });

        this.document.addEventListener('keyup', (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.resetMovement();
                    break;
                case 'ArrowDown':
                    this.resetMovement();
                    break;
                case 'ArrowRight':
                    this.resetTurn();
                    break;
                case 'ArrowLeft':
                    this.resetTurn();
                    break;
            }
        });
    }
}
