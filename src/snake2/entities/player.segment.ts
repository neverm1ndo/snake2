import { Entity } from "@engine/entitiy";
import { Matrix2D, Position2D } from "@engine/utils";

export class SnakeSegment extends Entity {
    constructor(
        public id: string,
        public prop: number[][],
        pos?: Position2D
    ) {
        super();

        if (pos) {
            this.setPosition(pos);
        }

        this._matrix = Matrix2D.fromArray(prop);
    }
}