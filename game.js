window.onload = init;
function bigNum(basNum,expNum) {	// basNum * 10^expNum 
	this.bas = basNum;
	this.exp = expNum;
}
function zero() {
	return new bigNum(0,0);
}
function one() {
	return new bigNum(1,0);
}
var game;
var consts;
const divId = ['accelerators', 'upgrades', 'options', 'others'];
function update() {
	game.time = add( game.time, consts.secondPerFrame );
	accelerate();
}
function refresh() {
	const timeSpan = document.getElementById("time");
	timeSpan.textContent = expToStr(game.time);
	for(let i = 0; i < game.accelerators.number.length; i++) {
		const buyButton = document.getElementById('buy-accelerator' + (i + 1));
		const numSpan = document.getElementById('number-accelerator' + (i + 1));
		const priceSpan = document.getElementById('price-accelerator' + (i + 1));
		const speedSpan = document.getElementById('speed-accelerator' + (i + 1));
		if(geq(game.time, game.accelerators.price[i])) {
			buyButton.disabled = false;
		} else {
			buyButton.disabled = true;
		}
		numSpan.textContent = expToStr(game.accelerators.number[i]);
		priceSpan.textContent = expToStr(game.accelerators.price[i]);
		speedSpan.textContent = expToStr( mul(
            game.accelerators.speed[i], 
            numToExp( game.upgrades.bought[0] ? Math.max(1, game.time.exp) : 1 )
        ) );
	}
	for(let i = 0; i < game.upgrades.bought.length; i++) {
		const buyButton = document.getElementById('buy-upgrade' + (i + 1));
		const priceSpan = document.getElementById('price-upgrade' + (i + 1));
		if(geq(game.time, game.upgrades.price[i]) && !game.upgrades.bought[i]) {
			buyButton.disabled = false;
		} else {
			buyButton.disabled = true;
		}
		priceSpan.textContent = expToStr(game.upgrades.price[i]);
	}
}
function frame() {
	update();
	refresh();
}
function init() {
	game = {
		time: zero(),
		accelerators: {
			number: [zero(), zero(), zero(), zero(), zero(), zero(), zero(), zero()],
			price: [new bigNum(1,1), new bigNum(2,1), new bigNum(1,2), new bigNum(1,3), new bigNum(1,5), new bigNum(1,8), new bigNum(1,11), new bigNum(1,15)],
			speed: [zero(), zero(), zero(), zero(), zero(), zero(), zero(), zero()]
		},
        upgrades: {
            bought: [false],
            price: [new bigNum(1,16)]
        }
	};
	consts = {
		milisecondPerFrame: 40,
		secondPerFrame: new bigNum(4, -2),
        milisecondPerAutosave: 10000
	};
	if(isValid()) {
		readData( localStorage.getItem('CWIG3-player-data') );
	}
	show('accelerators');
	setInterval(frame, consts.milisecondPerFrame);
	frame();
    setInterval(function() {
        localStorage.setItem( 'CWIG3-player-data', saveData() );
    }, consts.milisecondPerAutosave);
	console.log("Game initialized.");
}