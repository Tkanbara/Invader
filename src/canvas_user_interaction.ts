import {InvaderGame, UserInteraction, Key, Invader, DisplayObject, GameConfiguration} from "./invaders";

export class CanvasUserInteraction implements UserInteraction {
    constructor(
        private readonly canvas: HTMLCanvasElement
    ) {
    }

    init(config: GameConfiguration): void {
        this.canvas.width = config.width;
        this.canvas.height = config.height;
    }

    draw(game: InvaderGame): void {
        console.log("draw " + game.displayObjects.length + " objects.");

        this.clearCanvas(game);
        this.drawObjects(game.displayObjects);
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
            this.getRenderer(o)(this.canvas, o);
        });
    }

    private getRenderer(obj: DisplayObject): Renderer {
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
