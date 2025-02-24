function buyAccelerator(accelerator) {
	if(geq(game.time, game.accelerators.price[accelerator])) {
		game.accelerators.number[accelerator] = add(game.accelerators.number[accelerator], one());
		game.time = sub(game.time, game.accelerators.price[accelerator]);
		game.accelerators.price[accelerator] = mul(game.accelerators.price[accelerator], new bigNum(accelerator + 1, accelerator + 1));
		game.accelerators.speed[accelerator] = add(game.accelerators.speed[accelerator], one());
	}
}
function accelerate() {
	game.time = add(game.time, mul(game.accelerators.number[0], mul(game.accelerators.speed[0], consts.secondPerFrame)));
	for(let i = 0; i < game.accelerators.number.length - 1; i++) {
		game.accelerators.number[i] = 
        add(
            game.accelerators.number[i], 
            mul(
                game.accelerators.number[i + 1], 
                mul(
                    mul(
                        game.accelerators.speed[i + 1], 
                        numToExp( game.upgrades.bought[1] ? Math.max(1, game.time.exp) : 1 )
                    ),
                    consts.secondPerFrame
                )
            )
        );
	}
}
function maxAllAccelerators() {
	for(let i = 0; i < game.accelerators.number.length; i++) {
		while(geq(game.time, game.accelerators.price[i])) {
			buyAccelerator(i);
		}
	}
}