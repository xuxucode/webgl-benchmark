import storage from './storage.js';

import SingleTextureSingleBaseTexture from './pixi/scenes/SingleTextureSingleBaseTexture.js';
import MultipleTexturesMultipleBaseTextures from './pixi/scenes/MultipleTexturesMultipleBaseTextures.js';
import MultipleTexturesSingleBaseTexture from './pixi/scenes/MultipleTexturesSingleBaseTexture.js';
import Graphics from './pixi/scenes/Graphics.js';

export default class SceneController {
	constructor(app, stats, gui) {
		this._app = app;
		this._stats = stats;
		this._gui = gui;

		this._scenes = [
			new SingleTextureSingleBaseTexture(app, gui),
			new MultipleTexturesMultipleBaseTextures(app, gui),
			new MultipleTexturesSingleBaseTexture(app, gui),
			new Graphics(app, gui)
		];


		this._guiData = {
			scene: parseInt(storage.get('scene'), 10),
			objectCount: parseInt(storage.get('objectCount'), 10)
		};

		if (Number.isNaN(this._guiData.scene)) {
			this._guiData.scene = 0;
		}

		if (Number.isNaN(this._guiData.objectCount)) {
			this._guiData.objectCount = 10000;
		}

		storage.set('scene', this._guiData.scene);
		storage.set('objectCount', this._guiData.objectCount);

		const guiSceneController = this._gui.add(this._guiData, 'scene', {
			'Sprite: Single Texture': 0,
			'Sprite: 12 Texures': 1,
			'SpriteSheet': 2,
			'Graphics': 3
		});

		guiSceneController.onChange((value) => {
			storage.set('scene', value);
			this.switch(value);
		});

		const guiObjectCountController = this._gui.add(this._guiData, 'objectCount', 0, 100000, 1000);
		guiObjectCountController.onChange((value) => {
			storage.set('objectCount', value);
			this._scenes[this._guiData.scene].changeObjectCount(value);
		});

		this.switch(this._guiData.scene);

		document.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				if (this.scene === this._scenes.length - 1) {
					this.switch(0);
				} else {
					this.switch(this.scene + 1);
				}
			}
		});
	}

	start() {
		this._app.start();
		this._stats.domElement.style.visibility = 'visible';
		this._gui.domElement.style.visibility = 'visible';
	}

	switch(index) {
		if (index >= 0 && index < this._scenes.length) {
			for (const scene of this._scenes) {
				scene.stop();
			}

			this._scenes[index].start(this._guiData.objectCount);
		}
	}
}
