import { Food } from "./entities/food";
import { Player } from "./entities/player";
import { PlayZone } from "./playzone";

import { Matrix2D } from "./utils/matrix";
import { Position2D } from "./utils/position";
import { Renderer2D } from "./utils/renderer";

export default class Game {

    private canvas: HTMLCanvasElement = document.createElement('canvas'); 
    private context2D: CanvasRenderingContext2D | null;
    private screen: Matrix2D;
    private renderer: Renderer2D;
    private player?: Player;
    private playzone: PlayZone;

    private score: number = 0;

    private clock: number = Date.now();

    constructor() {
        const body: HTMLElement = document.body;
        body.style.inset = '0';
        body.style.margin = '0';
        body.style.position = 'fixed';
        
        if (!this.canvas) throw new Error('Canvas is not supported');
        
        this.context2D = this.canvas.getContext('2d');   
        if (!this.context2D) throw new Error('Canvas context is not supported');
        
        [this.canvas.width, this.canvas.height] = [640, 512];
        
        document.body.append(this.canvas);

        /** 
         * Create screen 2D matrix
         * Nokia 3310 resolution - 128 x 160 pixels
        */
         this.screen = new Matrix2D(128, 160);
         this.renderer = new Renderer2D(this.context2D!, this.screen);
      //    this.renderer.renderDebugPixels(this.screen);
  
        /** Create playzone matrix */
        this.playzone = new PlayZone(this.screen.height - 8, this.screen.width - 4);

        this.playzone.spawnFood(new Food());

        this.awake();
        this.update();
    }
    
    /**  */
    private awake(): void {

       this.playzone.draw();


    //    this.playzone.zoneMatrix.add(this.player.matrix);
        
        /** Spawn snake */
        const initialPlayerPosition = this.playzone.getCenter();
        
        this.player = new Player(initialPlayerPosition);
       
      //  this.playzone.zoneMatrix.add(this.player.segments.head, this.playzone.getCenter());
      //  this.playzone.zoneMatrix.add(this.player.segments.segment.invertHorizontal(), new Position2D(2, 8));
      //  this.playzone.zoneMatrix.add(this.player.segments.tip.invertHorizontal(), 13, 6);

       this.screen.add(this.playzone.zoneMatrix, new Position2D(2, 8));
    
    }
    
    /** Update loop */
    private update(): void {
      // setInterval(() => {
      //    // console.log(1)
      //    this.renderer.clear();
         this.renderer.drawMatrix(this.screen);
      //    this.player!.move();
      // }, 100);
    };

}