import { Game } from "@engine/game";
import { SnakeIIGameOptions } from "./models/game.options";
import { Player } from "./entities/player";
import { Food } from "./entities/food";
import { Position2D, Renderer2D } from "@engine/utils";
import { PlayZone } from "./entities/playzone";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@engine/constants";

export class SnakeII extends Game {
    constructor(private options: SnakeIIGameOptions) {
        super();
    }

    // private playzone!: PlayZone 

    private player!: Player;

    awake() {
        // this.debug.showDebugRenderingGrid(true);

        const playzone = new PlayZone([1, 10]);

        const playerInitialPosition = PlayZone.getCenterPosition(playzone) || new Position2D(0, 0);

        this.player = new Player(playerInitialPosition);

        this.scene.set('playzone', playzone);
        this.scene.set('food', this.createFood());

        for (const segment of this.player.chain) {
            playzone.add(segment);
        }
    }

    update() {}

    private createFood() {
        const zone = this.scene.get('playzone')! as PlayZone;

        const food = new Food();
        const position = PlayZone.getRandomPosition(zone, food);

        food.setPosition(position);

        return food;
    }
}