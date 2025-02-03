class Background {
    constructor(game) {
        this.game = game;
        this.tileImage = ASSET_MANAGER.getAsset("./sprites/tileset/tile.png"); // Get actual image
        this.border = ASSET_MANAGER.getAsset("./sprites/tileset/border.png"); // Get border image
        this.tileSize = 64; // Size of each tile
        this.borderWidth = 63; // Border tile width
        this.borderHeight = 15; // Border tile height
    }

    draw(ctx) {
        if (!ctx || !this.tileImage || !this.border) return; // Ensure ctx and images are valid

        // Fill the entire background with black
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Draw the tiled rectangle in the center of the screen
        const rectWidth = this.tileSize * 10;
        const rectHeight = this.tileSize * 6;
        const startX = (ctx.canvas.width - rectWidth) / 2;
        const startY = (ctx.canvas.height - rectHeight) / 2;
        
        for (let i = 0; i < 10; i++) { // 10 tiles wide
            for (let j = 0; j < 6; j++) { // 6 tiles high
                ctx.drawImage(this.tileImage, startX + i * this.tileSize, startY + j * this.tileSize, this.tileSize, this.tileSize);
            }
        }

        // Draw border around the rectangle
        for (let i = 0; i < 10; i++) { // Top and bottom border
            ctx.drawImage(this.border, startX + i * this.tileSize, startY - this.borderHeight, this.borderWidth, this.borderHeight); // Top border
            ctx.drawImage(this.border, startX + i * this.tileSize, startY + rectHeight, this.borderWidth, this.borderHeight); // Bottom border
        }
        
        // for (let j = 0; j < 6; j++) { // Left and right border
        //     ctx.save();
        //     ctx.translate(startX - this.borderWidth, startY + j * this.tileSize);
        //     ctx.rotate(Math.PI / 2);
        //     ctx.drawImage(this.border, 0, 0, this.borderWidth, this.borderHeight);
        //     ctx.restore();
            
        //     ctx.save();
        //     ctx.translate(startX + rectWidth + this.borderWidth, startY + j * this.tileSize);
        //     ctx.rotate(Math.PI / 2);
        //     ctx.drawImage(this.border, 0, 0, this.borderWidth, this.borderHeight);
        //     ctx.restore();
        // }
    }

    update() {
        // Background remains static, so no update logic needed
    }
}
