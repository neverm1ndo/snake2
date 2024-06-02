import { Matrix2D } from "@engine/utils/matrix";
import { Position2D } from "@engine/utils/position";

export abstract class Entity {
    protected _matrix?: Matrix2D;

    public readonly position: Position2D = new Position2D(0, 0);

    get matrix() {
        return this._matrix;
    }

    setPosition({ x, y }: Position2D) {
        this.position.x = x;
        this.position.y = y;
    }

    awake() {}

    update() {}
    
    destroy() {}
}