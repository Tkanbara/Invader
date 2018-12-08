export class Point {
    constructor(
        public readonly x: number,
        public readonly y: number
    ) {
    }

    moved(vector: Vector): Point {
        return new Point(this.x + vector.x, this.y + vector.y);
    }
}

export class Vector {
    constructor(
        public readonly x: number,
        public readonly y: number
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
        // 面積0の長方形は許容する。
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
            this.leftTop.moved(vector),
            this.rightBottom.moved(vector)
        );
    }

    intersects(other: Rect): boolean {
        let intersectsHorizontal = this.leftTop.x < other.rightBottom.x || other.leftTop.x < this.rightBottom.x;
        let intersectsVertical= this.leftTop.y < other.rightBottom.y || other.leftTop.y < this.rightBottom.y;

        return intersectsHorizontal && intersectsVertical;
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


export interface GameConfiguration {
    width: number;
    height: number;
}


export class InvaderGame implements GameConfiguration {
    public width = 640;
    public height = 480;

    invaders: Invader[] = [];
    displayObjects: DisplayObject[] = [];

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

        this.displayObjects.push(...this.invaders);
        this.displayObjects.push(new Player(new Point(615, 455), new Point(640, 480)));
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
    init(config: GameConfiguration): void;
    draw(game: InvaderGame): void;
    getKey(): Key | null;
}
