import { Entity } from "./entities/entitiy";
import { Food } from "./entities/food";
import { Matrix2D } from "./utils/matrix";
import { Position2D } from "./utils/position";

export class PlayZone {

    private __zone: Matrix2D;

    get zoneMatrix(): Matrix2D {
        return this.__zone;
    }

    constructor(heigth: number, width: number) {
        this.__zone = new Matrix2D(heigth, width);
    }
    public draw(): void {
        const line: number[] = Array(this.__zone.width).fill(1);
        for (const index of [0, this.__zone.height - 2]) this.__zone.setMatrixRow(index, line);
        for (let i = 0; i < this.__zone.height - 1; i++) {
            this.__zone.fillElement(0, i, true);
            this.__zone.fillElement(this.__zone.width - 1, i, true);
        }
    }

    public spawnFood(food: Food): void {
        this.__zone.add(food.matrix, PlayZone.getRandomPosition(this.__zone.width - 1, this.__zone.height - 1));
    }

    public add<T extends Entity>(entity: T): void {
        /** Add intercative entity */
    }

    public getCenter(): Position2D {
        return new Position2D(this.__zone.width/2, this.__zone.height/2);
    }

    public static getRandomPosition(maxwidth: number, maxheight: number): Position2D {
        const [x, y]: number[] = [maxwidth, maxheight].map((val: number) => Math.floor(Math.random()*val));
        return new Position2D(x, y);
    }
}