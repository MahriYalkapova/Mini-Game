const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/tileset/tile.png");
ASSET_MANAGER.queueDownload("./sprites/tileset/border.png");
ASSET_MANAGER.queueDownload("./sprites/MainCharacter/Back_animations/back_idle.png");
ASSET_MANAGER.queueDownload("./sprites/MainCharacter/Back_animations/back_walk.png");
ASSET_MANAGER.queueDownload("./sprites/MainCharacter/Front_animations/front_idle.png");
ASSET_MANAGER.queueDownload("./sprites/MainCharacter/Front_animations/front_walk.png");
ASSET_MANAGER.queueDownload("./sprites/MainCharacter/Side_animations/left_idle.png");
ASSET_MANAGER.queueDownload("./sprites/MainCharacter/Side_animations/left_walk.png");
ASSET_MANAGER.queueDownload("./sprites/MainCharacter/Side_animations/right_idle.png");
ASSET_MANAGER.queueDownload("./sprites/MainCharacter/Side_animations/right_walk.png");
ASSET_MANAGER.queueDownload("./sprites/MainCharacter/Back_animations/back_attack.png");
ASSET_MANAGER.queueDownload("./sprites/MainCharacter/Front_animations/front_attack.png");
ASSET_MANAGER.queueDownload("./sprites/MainCharacter/Side_animations/left_attack.png");
ASSET_MANAGER.queueDownload("./sprites/MainCharacter/Side_animations/right_attack.png");
 

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.addEntity(new Player(gameEngine));
	gameEngine.addEntity(new Background(gameEngine));
	

	gameEngine.init(ctx);

	gameEngine.start();
});
