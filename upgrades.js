function buyUpgrade(upgrade) {
	if(geq(game.time, game.upgrades.price[upgrade]) && !game.upgrades.bought[upgrade]) {
        game.upgrades.bought[upgrade] = true;
		game.time = sub(game.time, game.upgrades.price[upgrade]);
	}
}