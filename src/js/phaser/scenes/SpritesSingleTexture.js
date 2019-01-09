import IScene from './IScene.js';

export default class SpritesSingleTexture extends IScene {
	constructor(app, gui) {
		super(app, gui);

		this.title = 'Sprites: Single Texture';
		this.description = 'A single bunny texture is used; this scene should test the basic raw sprite rendering power.'
	}

	_create(objectCount) {
		for (let i = this._root.list.length; i < objectCount; ++i) {
			const sprite = this._app.scene.add.sprite('images/bunny1.png');
			//sprite.setPosition(Math.random() * this._app.screen.width, Math.random() * this._app.screen.height);
			this._root.add(sprite);
		}
	}
}
