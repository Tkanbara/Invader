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

    inverse(): Vector {
        return new Vector(-this.x, -this.y);
    }
}

export class Rect {
    constructor(
        public leftTop: Point,
        public rightBottom: Point
    ) {
        // 整合性チェック処理。
        // 面積0の四角形は許容する。
        if (!(leftTop.x <= rightBottom.x) || !(leftTop.y <= rightBottom.y)) {
            throw new Error("invalid rectangle");
        }
    }

    // 幅
    get width(): number {
        return this.rightBottom.x - this.leftTop.x;
    }

    get height() {
        return this.rightBottom.y - this.leftTop.y;
    }

    moved(vector: Vector): Rect {
        return new Rect(
            new Point(this.leftTop.x + vector.x, this.leftTop.y + vector.y),
            new Point(this.rightBottom.x + vector.x, this.rightBottom.y + vector.y)
        );
    }

    intercects(other: Rect): boolean {
        return false;
    }
}


export class DisplayObject {
    public displayArea: Rect;

    // 移動方向
    movement: Vector = new Vector(0, 0);

    constructor(leftTop: Point, rightBottom: Point) {
        this.displayArea = new Rect(leftTop, rightBottom);
    }

    move() {
        this.displayArea = this.displayArea.moved(this.movement);
    }
}


export class Player extends DisplayObject {
}


export class Invader extends DisplayObject {
}


export class InvaderGame {
    public width = 640;
    public height = 480;

    invaders: Invader[] = [];
    gameWindow: DisplayObject[] = [];

    constructor(
        private interaction: UserInteraction
    ) {
        // 自機とインベーダーの生成
        this.invaders.push(new Invader(new Point(0, 0), new Point(25, 25)));
        this.invaders.push(new Invader(new Point(30, 0), new Point(55, 25)));
        this.invaders.push(new Invader(new Point(60, 0), new Point(85, 25)));

        this.invaders.forEach(i => {
            i.movement = new Vector(10, 0);
        });

        this.gameWindow.push(...this.invaders);
        this.gameWindow.push(new Player(new Point(615, 455), new Point(640, 480)));
    }

    nextFrame(): void {
        let key = this.interaction.getKey();

        this.invaders.forEach(i => {
            i.move();
            i.movement = i.movement.inverse();
        });

        this.interaction.draw(this);
    }
}


export enum Key {
    UP = 0,
}


export interface UserInteraction {
    init(game: InvaderGame): void;
    draw(game: InvaderGame): void;
    getKey(): Key | null;
}
