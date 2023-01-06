import { Matrix2D } from "@game/utils/matrix";

export class Renderer2D {

    private screen: { width: number, height: number };
    private PIXEL_SIZE: number;

    constructor(
        private context2D: CanvasRenderingContext2D, 
        private matrix: Matrix2D
    ) {
        this.context2D.imageSmoothingEnabled = false;
        this.screen = {
            width: this.context2D.canvas.clientWidth,
            height: this.context2D.canvas.clientHeight
        };
        this.PIXEL_SIZE = this.getPixelRatio();
    }

    clear() {
        this.context2D.clearRect(0, 0, this.screen.width, this.screen.height);
    }

    getPixelRatio(): number {
        return this.screen.width/this.matrix.width;
    }
    
    renderDebugPixels(matrix: Matrix2D) {
        const [matrixWidth, matrixHeight]: number[] = [matrix.width, matrix.height];
        for(let i = 1; i < matrixWidth; i++) {
            this.drawLine(i*this.PIXEL_SIZE, 0, i*this.PIXEL_SIZE, this.screen.height, 1, '#00000030');
        }
        for(let i = 1; i < matrixHeight; i++) {
            this.drawLine(0, i*this.PIXEL_SIZE, this.screen.width, i*this.PIXEL_SIZE, 1, '#00000030');
        }
    }
    
    drawLine(x1: number, y1: number, x2: number, y2: number, width: number, color: string): void {
        const path = new Path2D();
              path.moveTo(x1, y1);
              path.lineTo(x2, y2);
              path.closePath();
        this.context2D.strokeStyle = color;
        this.context2D.lineWidth = width;
        this.context2D.stroke(path);    
    }

    drawPixel(x: number, y: number, size: number[]) {
        this.context2D.rect(x*size[0], y*size[1], size[0], size[1]);
        this.context2D.fill();
    }

    drawMatrix(matrix: Matrix2D) {
        const matrixArray = matrix.getMatrixAsArray();
        this.context2D.fillStyle = 'black';
        for (let row = 0; row < matrix.height; row++) {
            for (let pixel = 0; pixel < matrix.width; pixel++) {
                if (!matrixArray[row][pixel]) continue;
                this.drawPixel(pixel, row, [this.PIXEL_SIZE, this.PIXEL_SIZE])
            }
        }
    }
}