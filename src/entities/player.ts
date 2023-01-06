import { Position2D } from "../utils/position";
import { Matrix2D, Matrix2DDirection } from "../utils/matrix";
import { Controls } from "../controls";
import { Entity } from "./entitiy";

export class Player extends Entity {

    readonly segments: { [key: string]: Matrix2D} = {
        head: Matrix2D.fromArray([
            [0, 0, 1, 0, 0],
            [1, 1, 0, 1, 0],
            [1, 1, 1, 1, 1]
        ]),
        common: Matrix2D.fromArray([
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0]
        ]),
        filled: Matrix2D.fromArray([
            [0, 0, 0, 1, 0, 0, 0],
            [0, 1, 1, 0, 1, 1, 0],
            [1, 1, 0, 1, 1, 1, 1],
            [0, 0, 1, 1, 0, 0, 0]
        ]),
        bend: Matrix2D.fromArray([
            [0, 1, 1, 1],
            [1, 1, 1, 0],
            [0, 0, 1, 0]
        ]),
        tip: Matrix2D.fromArray([
            [0, 0, 0, 0],
            [0, 1, 1, 1],
            [1, 1, 1, 0]
        ])
    }

    public position: Position2D = new Position2D(0, 0);
    private __direction: Matrix2DDirection = Matrix2DDirection.LEFT;

    private chain: Matrix2D[] = [
        this.segments.head,
        this.segments.common,
        this.segments.tip
    ];

    set direction(direction: Matrix2DDirection) {
        this.__direction = direction;
    }

    get direction() {
        return this.__direction;
    }

    constructor(position: Position2D, direction?: Matrix2DDirection) {
        super();
        this.position = position;
        if (direction) this.direction = direction;
        new Controls(this);
    }

    get length(): number {
        return this.chain.length;
    }

    public move(): void {
        this.position.x = this.position.x++;
        this.position.y = this.position.y++;
    }
    
    
    public grow(): void {
        this.chain.splice(this.chain.length - 1, 1, this.segments.common);
    }
}