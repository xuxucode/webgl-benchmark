import IScene from './IScene.js';

export default class GraphicsComplex extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this.title = 'Graphics: Complex';
		this.description = 'One of four complex shapes types are used, making more advanced techniques are used to keep performance up.';

		this._colors = [0x29BF12, 0xABFF4F, 0x08BDBD, 0xF21B3F, 0xFF9914];
	}

	_create(objectCount) {
		for (let i = this._children.length; i < objectCount; ++i) {
			const color = this._colors[this._children.length % this._colors.length];
			const graphic = this._app.scene.add.graphics({ fillStyle: { color } });

			const type = this._children.length % 4;
			if (type === 0) {
				const polygon = this._drawStar(0, 0, 5, 30, 20, 1);
				graphic.fillPoints(polygon.points, true);
			} else if (type === 1) {
				graphic.fillTriangleShape(new Phaser.Geom.Triangle(-15, -30, 15, 15, -30, 15));
			} else if (type === 2) {
				const polygon = new Phaser.Geom.Polygon([-15, -30, -15, 0, 15, 15, -30, 15]);
				graphic.fillPoints(polygon.points, true)
			} else {
				graphic.fillEllipseShape(new Phaser.Geom.Ellipse(0, 0, 60, 30));
			}

			graphic.x = Math.random() * this._app.screen.width;
			graphic.y = Math.random() * this._app.screen.height
		}
	}

	_drawStar(x, y, points, radius, innerRadius, rotation = 0) {
		innerRadius = innerRadius || radius / 2;

		const startAngle = (-1 * Math.PI / 2) + rotation;
		const len = points * 2;
		const delta = Math.PI * 2 / len;
		const polygon = [];

		for (let i = 0; i < len; i++) {
			const r = i % 2 ? innerRadius : radius;
			const angle = (i * delta) + startAngle;

			polygon.push(
				x + (r * Math.cos(angle)),
				y + (r * Math.sin(angle))
			);
		}

		return new Phaser.Geom.Polygon(polygon);
	}
}
