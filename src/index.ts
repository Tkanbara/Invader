import { InvaderGame } from "./invaders";
import { CanvasUserInteraction } from "./canvas_user_interaction";

const interaction = new CanvasUserInteraction(<HTMLCanvasElement>document.getElementById("game"));
const game = new InvaderGame(interaction);

interaction.init(game);

setInterval(() => {
    game.nextFrame();
}, 1000);
