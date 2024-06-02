import { Position2D } from "@engine/utils/position";
import { Matrix2D, Matrix2DDirection, MatrixProp } from "@engine/utils/matrix";
import { Entity } from "@engine/entitiy";
import {
    snakeBendBodyProp,
    snakeBodyTipProp,
    snakeCommonBodyProp,
    snakeFilledBodyProp,
    snakeHeadProp
} from "@game/props";
import { SnakeSegment } from "./player.segment";

export class Player {
    private __direction: Matrix2DDirection = Matrix2DDirection.LEFT;

    private __chain: SnakeSegment[] = this.createInititalChain(this.position);

    set direction(direction: Matrix2DDirection) {
        this.__direction = direction;
    }

    get direction() {
        return this.__direction;
    }

    private get __head() {
        return this.__chain[0];
    }

    get chain() {
        return this.__chain;
    }

    constructor(
        private position: Position2D, 
        direction?: Matrix2DDirection
    ) {
        if (direction) this.direction = direction;
    }

    get length(): number {
        return this.chain.length;
    }

    private __isVerticalDirection() {
        const { UP, DOWN } = Matrix2DDirection;
        return this.__direction === UP || this.__direction === DOWN;
    }

    private createInititalChain(position: Position2D): SnakeSegment[] {
        const rawSegments: [string, MatrixProp][] = [
            ['head', snakeHeadProp],
            ['1', snakeCommonBodyProp],
            ['tip', snakeBodyTipProp],
        ];

        const segments: SnakeSegment[] = [
            new SnakeSegment('head', snakeHeadProp, position)
        ];

        for (let segmentIndex = 1, prevSegmentIndex = 0; segmentIndex < rawSegments.length; segmentIndex++) {
            const [id, prop] = rawSegments[segmentIndex];
            const { position: prevSegmentPosition, matrix } = segments[prevSegmentIndex];
            const segmentPosition = Position2D.add(prevSegmentPosition, { x: matrix!.width, y: 0 });

            const segment = new SnakeSegment(id, prop, segmentPosition)

            segments.push(segment);
            prevSegmentIndex = segmentIndex;
        }

        return segments;
    }

    public move(): void {
        this.position.x = this.position.x++;
        // this.position.y = this.position.y++;
    }

    public changeDirection(direction: Matrix2DDirection): void {
        this.__direction = direction;
    }


    public grow(): void {
        // this.__attachSegmentToHead('body');
    }

}