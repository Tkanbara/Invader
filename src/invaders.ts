export class Point {
    constructor(
        public x: number,
        public y: number
    ) {
    }
}

export class Vector {
    constructor(
        public x: number,
        public y: number
    ) {
    }
}


export class DisplayObject {
    // 左上の座標
    leftTop: Point;

    // 右下の座標
    rightBottom: Point;

    // 移動方向
    vector: Vector;

    // 幅
    width(): number {
        return this.rightBottom.x - this.leftTop.x;
    }

    isConflicted(other: DisplayObject): boolean {
        return false;
    }
}


export class Player extends DisplayObject {
    constructor() {
        super();
        this.vector = new Vector(0, 0);
    }
}


export class Invader extends DisplayObject {
}


export class InvaderGame {
    gameWindow: DisplayObject[] = [];

    constructor(
        private interaction: UserInteraction
    ) {
        // 自機とインベーダーの生成
    }

    nextFrame(): void {
        let key = this.interaction.getKey();


        this.interaction.draw(this);
    }
}


export enum Key {
    UP = 0,
}


export interface UserInteraction {
    draw(game: InvaderGame): void;
    getKey(): Key | null;
}
