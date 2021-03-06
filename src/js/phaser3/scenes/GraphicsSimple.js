import IScene from './IScene.js';

export default class GraphicsSimple extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this.title = 'Graphics: Simple';
		this.description = 'Only a single square graphic type is created; this scene should test the basic raw graphics rendering power.';

		this._colors = [0x29BF12, 0xABFF4F, 0x08BDBD, 0xF21B3F, 0xFF9914];
	}

	_create(objectCount) {
		for (let i = this._children.length; i < objectCount; ++i) {
			const color = this._colors[this._children.length % this._colors.length];
			const graphic = this._app.scene.add.graphics({ fillStyle: { color } });
			graphic.fillRectShape(new Phaser.Geom.Rectangle(-15, -15, 30, 30));
			graphic.x = Math.random() * this._app.screen.width;
			graphic.y = Math.random() * this._app.screen.height
		}
	}
}
