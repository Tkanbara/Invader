import { InvaderGame, UserInteraction, Key, Invader } from "./invaders";

export class CanvasUserInteraction implements UserInteraction {
    draw(game: InvaderGame): void {
        game.gameWindow.forEach(obj => {
            if (obj instanceof Invader) {
                // インベーダーを描画
            }
        });
    }

    getKey(): Key | null {
        return null;
    }
}
