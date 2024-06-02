import { Matrix2D } from "@engine/utils/matrix";
import { Entity } from "@engine/entitiy";
import { foodMatrixProp } from "@game/props";

export class Food extends Entity {
    _matrix?: Matrix2D = Matrix2D.fromArray(foodMatrixProp);
}