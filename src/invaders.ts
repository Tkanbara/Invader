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
    vector: Vector = new Vector(0, 0);

    constructor(leftTop: Point, rightBottom: Point) {
        this.leftTop = leftTop;
        this.rightBottom = rightBottom;
    }

    // 幅
    width(): number {
        return this.rightBottom.x - this.leftTop.x;
    }

    isConflicted(other: DisplayObject): boolean {
        return false;
    }
}


export class Player extends DisplayObject {
    constructor(leftTop: Point, rightBottom: Point) {
        super(leftTop, rightBottom);
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
