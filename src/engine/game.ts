import { Entity } from "@engine/entitiy";
import { Matrix2D } from "@engine/utils/matrix";
import { Renderer2D } from "@engine/utils/renderer";
import { DEFAULT_PIXEL_RATIO, SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";

export abstract class Game {
   private canvas: HTMLCanvasElement = document.createElement('canvas'); 
   private context2D: CanvasRenderingContext2D | null;
   private renderer: Renderer2D;
   
   protected screen: Matrix2D;
   protected scene: Map<string, Entity> = new Map();

   private clock: number = Date.now();

   public debug = {
      showDebugRenderingGrid: (show: boolean) => {
         this.renderer.debug = show;
      }
   };

   constructor() {
      const body: HTMLElement = document.body;
      body.style.inset = '0';
      body.style.margin = '0';
      body.style.position = 'fixed';
      
      if (!this.canvas) throw new Error('Canvas is not supported');
      
      this.context2D = this.canvas.getContext('2d'); 
      if (!this.context2D) throw new Error('Canvas context is not supported');
      
      this.context2D.imageSmoothingEnabled = false;
      // this.context2D.translate(0.5, 0.5);

      [this.canvas.width, this.canvas.height] = [SCREEN_WIDTH*DEFAULT_PIXEL_RATIO, SCREEN_HEIGHT*DEFAULT_PIXEL_RATIO];
      
      document.body.append(this.canvas);

      /** 
      * Create screen 2D matrix
      * Nokia 3310 resolution - 128 x 160 pixels
      */
      this.screen = new Matrix2D(SCREEN_HEIGHT, SCREEN_WIDTH);
      this.renderer = new Renderer2D(this.context2D!, this.screen, false);

      this.onAwake();
      // this.onUpdate();
   }
   
   /** Once before update loop */
   private onAwake(): void {
      this.awake();

      for (const object of this.scene.values()) {
         object.awake();

         if (object.matrix) {
            this.screen.add(object.matrix, object.position);
         }
      }

      this.renderer.drawMatrix(this.screen);
   }
   
   /** Update loop */
   private onUpdate(): void {
      this.renderer.clear();

      this.update();

      for (const object of this.scene.values()) {
         object.update();
      }

      this.renderer.drawMatrix(this.screen);
   };

   private tick() {}

   protected awake() {}

   protected update() {}
}