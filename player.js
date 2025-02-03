class Player {
    constructor(game) {
        this.game = game;
        this.x = 300;
        this.y = 300;
        this.velocity = { x: 0, y: 0 };
        this.facing = "down";
        this.attacking = false;
        
        this.animationMap = new Map();
        
        // Movement animations
        this.animationMap.set("idleUp", new Animator(ASSET_MANAGER.getAsset("./sprites/MainCharacter/Back_animations/back_idle.png"), 0, 10, 64, 54, 7, 0.2));
        this.animationMap.set("walkUp", new Animator(ASSET_MANAGER.getAsset("./sprites/MainCharacter/Back_animations/back_walk.png"), 0, 10, 64, 54, 6, 0.2));
        this.animationMap.set("idleDown", new Animator(ASSET_MANAGER.getAsset("./sprites/MainCharacter/Front_animations/front_idle.png"), 0, 10, 64, 54, 7, 0.2));
        this.animationMap.set("walkDown", new Animator(ASSET_MANAGER.getAsset("./sprites/MainCharacter/Front_animations/front_walk.png"), 0, 10, 64, 54, 6, 0.2));
        this.animationMap.set("idleLeft", new Animator(ASSET_MANAGER.getAsset("./sprites/MainCharacter/Side_animations/left_idle.png"), 0, 10, 64, 54, 7, 0.2));
        this.animationMap.set("walkLeft", new Animator(ASSET_MANAGER.getAsset("./sprites/MainCharacter/Side_animations/left_walk.png"), 0, 10, 64, 54, 6, 0.2));
        this.animationMap.set("idleRight", new Animator(ASSET_MANAGER.getAsset("./sprites/MainCharacter/Side_animations/right_idle.png"), 0, 10, 64, 54, 7, 0.2));
        this.animationMap.set("walkRight", new Animator(ASSET_MANAGER.getAsset("./sprites/MainCharacter/Side_animations/right_walk.png"), 0, 10, 64, 54, 6, 0.2));
        
        // Attack animations
        this.animationMap.set("attackUp", new Animator(ASSET_MANAGER.getAsset("./sprites/MainCharacter/Back_animations/back_attack.png"), 0, 10, 64, 54, 7, 0.1));
        this.animationMap.set("attackDown", new Animator(ASSET_MANAGER.getAsset("./sprites/MainCharacter/Front_animations/front_attack.png"), 0, 10, 64, 54, 7, 0.1));
        this.animationMap.set("attackLeft", new Animator(ASSET_MANAGER.getAsset("./sprites/MainCharacter/Side_animations/left_attack.png"), 0, 10, 64, 54, 7, 0.1));
        this.animationMap.set("attackRight", new Animator(ASSET_MANAGER.getAsset("./sprites/MainCharacter/Side_animations/right_attack.png"), 0, 10, 64, 54, 7, 0.1));
        
        this.animator = this.animationMap.get("idleDown");
    }
    
    update() {
        this.velocity.x = 0;
        this.velocity.y = 0;

        if (this.game.up) {
            this.velocity.y = -3;
            this.facing = "up";
            this.animator = this.animationMap.get("walkUp");
        }
        if (this.game.down) {
            this.velocity.y = 3;
            this.facing = "down";
            this.animator = this.animationMap.get("walkDown");
        }
        if (this.game.left) {
            this.velocity.x = -3;
            this.facing = "left";
            this.animator = this.animationMap.get("walkLeft");
        }
        if (this.game.right) {
            this.velocity.x = 3;
            this.facing = "right";
            this.animator = this.animationMap.get("walkRight");
        }
        
        // Idle state when no movement
        if (!this.game.up && !this.game.down && !this.game.left && !this.game.right && !this.attacking) {
            this.animator = this.animationMap.get(`idle${this.facing.charAt(0).toUpperCase() + this.facing.slice(1)}`);
        }
        
        // Attack logic triggered by left mouse click
        if (this.game.attack && !this.attacking) {
            this.attacking = true;
            this.animator = this.animationMap.get(`attack${this.facing.charAt(0).toUpperCase() + this.facing.slice(1)}`);
            this.animator.elapsedTime = 0; // Reset animation progress
        }
        
        // Reset attack state once animation completes
        if (this.attacking && this.animator.isDone()) {
            this.attacking = false;
            this.animator = this.animationMap.get(`idle${this.facing.charAt(0).toUpperCase() + this.facing.slice(1)}`);
        }
        
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Screen boundaries
        this.x = Math.max(0, Math.min(gameWorld.width - 64, this.x));
        this.y = Math.max(0, Math.min(gameWorld.height - 64, this.y));
    }

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
}
