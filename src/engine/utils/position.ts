export class Position2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        [this.x, this.y] = [x, y];
    }


    static add(a: Position2D, b: Position2D) {
        return new Position2D(a.x + b.x, a.y + b.y);
    }

    static clone(position: Position2D) {
        return new Position2D(position.x, position.y);
    }
}