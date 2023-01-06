import { Player } from "./entities/player";
import { Matrix2DDirection } from "./utils/matrix";

export class Controls {
    
    constructor(private __player: Player) {
        this.__setKeyboardEvents();
    }

    private __setKeyboardEvents(): void {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp': this.up(); break;
                case 'ArrowDown': this.down(); break;
                case 'ArrowLeft': this.left(); break;
                case 'ArrowRight': this.right(); break;
                default:
                    break;
            }
        });
    }

    up() {
        this.__player.direction = Matrix2DDirection.UP;
    }
    down() {}
    left() {}
    right() {}
}