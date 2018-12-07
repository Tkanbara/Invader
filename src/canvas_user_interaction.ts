import { InvaderGame, UserInteraction, Key, Invader, DisplayObject } from "./invaders";

export class CanvasUserInteraction implements UserInteraction {
    private canvas: HTMLCanvasElement;

    constructor(el: HTMLCanvasElement) {
        this.canvas = el;
    }

    init(game: InvaderGame): void {
        this.canvas.width = game.width;
        this.canvas.height = game.height;
    }

    draw(game: InvaderGame): void {
        console.log("draw " + game.gameWindow.length + " objects.");

        this.clearCanvas(game);
        this.drawObjects(game.gameWindow);
    }

    getKey(): Key | null {
        return null;
    }

    private clearCanvas(game: InvaderGame) {
        const ctx = this.canvas.getContext("2d")!;
        ctx.clearRect(0, 0, game.width, game.height);
    }

    private drawObjects(objects: DisplayObject[]) {
        objects.forEach(o => {
            this.getRendrer(o)(this.canvas, o);
        });
    }

    private getRendrer(obj: DisplayObject): Renderer {
        if (obj instanceof Invader) {
            return InvaderRenderer;
        } else {
            return PlayerRenderer;
        }
    }
}


type Renderer = (canvas: HTMLCanvasElement, o: DisplayObject) => void


const InvaderRenderer = (canvas: HTMLCanvasElement, o: DisplayObject) => {
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = 'blue';

    ctx.fillRect(
        o.displayArea.leftTop.x,
        o.displayArea.leftTop.y,
        o.displayArea.width,
        o.displayArea.height);
};


const PlayerRenderer = (canvas: HTMLCanvasElement, o: DisplayObject) => {
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = 'red';

    ctx.fillRect(
        o.displayArea.leftTop.x,
        o.displayArea.leftTop.y,
        o.displayArea.width,
        o.displayArea.height);
};
