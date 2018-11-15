import { InvaderGame } from "./invaders";
import { CanvasUserInteraction } from "./canvas_user_interaction";

const interaction = new CanvasUserInteraction();
const game = new InvaderGame(interaction);

setInterval(() => {
    game.nextFrame();
}, 1000);
