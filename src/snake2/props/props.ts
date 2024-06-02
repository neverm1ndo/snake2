import { MatrixProp } from "@engine/utils";

/**
 * Food prop
 */
export const foodMatrixProp: MatrixProp = [
    [0, 1, 0],
    [1, 0, 1],
    [0, 1, 0]
];

/**
 * Snake segments
 */
export const snakeHeadProp: MatrixProp = [
    [0, 0, 1, 0, 0],
    [1, 1, 0, 1, 0],
    [1, 1, 1, 1, 1]
];

export const snakeCommonBodyProp: MatrixProp = [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 1]
];

export const snakeFilledBodyProp: MatrixProp = [
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 1, 0],
    [1, 1, 0, 1, 1, 1, 1],
    [0, 0, 1, 1, 0, 0, 0]
];

export const snakeBendBodyProp: MatrixProp = [
    [0, 1, 1, 1],
    [1, 1, 1, 0],
    [0, 0, 1, 0]
];

export const snakeBodyTipProp: MatrixProp = [
    [0, 0, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 1, 1]
];

/**
 * Digits
 */