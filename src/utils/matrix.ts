import { Position2D } from "./position";

export enum Matrix2DDirection {
    UP,
    RIGHT,
    DOWN,
    LEFT
}

export class Matrix2D {
    
    private matrixArray: number[][] = [];

    private direction: Matrix2DDirection = Matrix2DDirection.LEFT;
    
    constructor(height: number, width: number) {
        for (let i = 0; i < height; i++) {
            let row: number[] = [];
            for(let j = 0; j < width; j++) {
                row.push(0);
            }
            this.matrixArray.push(row);
        }
    }

    public setMatrixRow(index: number, row: number[]) {
        this.matrixArray[index] = row;
    }

    get width(): number {
        return this.matrixArray[0].length;
    }

    public getMatrixAsArray(): number[][] {
        return this.matrixArray;
    }

    get height(): number {
        return this.matrixArray.length;
    }

    public fillElement(x: number, y: number, value: boolean): void {
        this.matrixArray[y][x] = +value;
    }

    public clear(): void {
        this.matrixArray = Array(this.height).fill(Array(this.width).fill(0));
    }

    static fromArray(array: number[][]): Matrix2D {
        const [height, width]: number[] = [array.length, array[0].length];
        const matrix = new Matrix2D(height, width);
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (array[i][j] === 0) continue;
                matrix.fillElement(j, i, true);
            }
        }
        return matrix;
    }

    private invertDirection(): Matrix2DDirection {
        this.direction = Math.abs(this.direction - 2);
        return this.direction;
    }

    public invertHorizontal() {
        this.invertDirection();
        for (let i = 0; i < this.height; i++) {
            this.matrixArray[i].reverse();
        }
        return this;
    }

    public invertVertical(): Matrix2D {
        this.invertDirection();
        this.matrixArray.reverse();
        return this;
    }

    public rotate(clockwise?: boolean): Matrix2D {
        const result: number[][] = [];
        for (let i = this.height - 1; i >= 0; i--) {
          for (let j = 0; j < this.width; j++) {
            if (!result[j]) result[j] = [];
            result[j].push(this.matrixArray[i][j]);
          }
        }
        this.matrixArray = result;
        return this;
    }

    public add(m2: Matrix2D, offset: Position2D): Matrix2D {
        const m2Array = m2.getMatrixAsArray();
        for (let i = 0; i < m2.height; i++) {
            for(let j = 0; j < m2.width; j++) {
                if (this.matrixArray[i + offset.y][j + offset.x] === 1) continue;
                this.fillElement(j + offset.x, i + offset.y, Boolean(m2Array[i][j]));
            }
        }
        return this;
    }
}