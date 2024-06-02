import { Player } from "@game/entities/player";
// import { Matrix2DDirection } from "../engine/utils/matrix";

export class Controls {
    constructor(private __player: Player) {
        this.__setKeyboardEvents();
    }

    private keyBindsMap = new Map([
        ['ArrowUp', this.up],
        ['ArrowDown', this.down],
        ['ArrowLeft', this.left],
        ['ArrowRight', this.right],
    ]);
    
    private keydownEventListenerHandler = (event: KeyboardEvent) => {
        const action = this.keyBindsMap.get(event.key);

        if (!action) return;

        action.call(this);
    }

    private __setKeyboardEvents(): void {
        document.addEventListener('keydown', this.keydownEventListenerHandler);
    }

    up() {
        // this.__player.changeDirection()
    }
    down() {}
    left() {}
    right() {}

    dismiss() {
        document.removeEventListener('keydown', this.keydownEventListenerHandler);
    }
}