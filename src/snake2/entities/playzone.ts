import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@engine/constants";
import { Entity } from "@engine/entitiy";
import { Matrix2D, Position2D } from "@engine/utils";

export class PlayZone extends Entity {

    constructor(private readonly offset: [number, number]) {
        super();

        this.createBorder(offset);
    }

    public readonly borderWidth = 1;

    get zoneOffset() {
        return this.offset;
    }

    // isOutOfBounds() {}

    add<T extends Entity>(entitiy: T) {
        // super
        if (!entitiy.matrix) return;

        this.matrix?.add(entitiy.matrix, { x: entitiy.position.x + 1, y: entitiy.position.y + 1 })
    }

    remove<T extends Entity>(entitiy: T) {}
    
    private createBorder([offsetX, offsetY]: [number, number]) {
        const horizontal = Matrix2D.fromArray([
            new Array(SCREEN_WIDTH - offsetX * 2).fill(1)
        ]);

        this.setPosition(new Position2D(offsetX, offsetY));

        const [width, height] = [
            SCREEN_WIDTH - offsetX,
            SCREEN_HEIGHT - offsetY
        ];

        this._matrix = new Matrix2D(height, width);
        this._matrix.add(horizontal, { x: 0, y: 0 });
        this._matrix.add(horizontal, { x: 0, y: height - 1 });

        for (let i = 0; i < height - 1; i++) {
            this._matrix.fillElement(0, 1 + i, true);
            this._matrix.fillElement(width - offsetX * 2, 1 + i, true);
        }
    }

    public static getCenterPosition({ matrix, offset: [offsetX, offsetY] }: PlayZone) {
        if (!matrix) return;

        return new Position2D(
            (matrix.width - offsetX) / 2,
            (matrix.height - offsetY) / 2
        );
    }

    public static getRandomPosition<T extends Entity>(
        { 
            matrix,
            offset: [ offsetX, offsetY ],
            borderWidth
        }: PlayZone,
        { matrix: entityMatrix }: T
    ): Position2D {
        const [x, y]: number[] = [
            [matrix!.width - offsetX - (entityMatrix?.width || 0), offsetX], 
            [matrix!.height - offsetY - (entityMatrix?.height || 0), offsetY ]
        ].map(([val, offset]: number[]) => Math.floor(Math.random() * val + offset + borderWidth));

        return new Position2D(x, y)
    }
}