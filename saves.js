function addStr(str, obj) {
	return str + obj.bas + ' ' + obj.exp + ' ';
}
function saveData() {
	let str = '';
	str = addStr(str, game.time);
	for(let i = 0; i < game.accelerators.number.length; i++) {
		str = addStr(str, game.accelerators.number[i]);
		str = addStr(str, game.accelerators.price[i]);
		str = addStr(str, game.accelerators.speed[i]);
	}
	for(let i = 0; i < game.upgrades.bought.length; i++) {
		str = str + (game.upgrades.bought[i] ? 1 : 0) + ' ';
		str = addStr(str, game.upgrades.price[i]);
	}
	// console.log(str);
	// console.log(btoa(str));
	return btoa(str);
}
function readObj(arr, index) {
	return new bigNum( parseFloat(arr[index]), parseFloat(arr[index + 1]) );
}
function readData(dataString) {
	if(typeof(dataString) != 'string' || dataString.length == 0) {
		alert('数据不合法!');
		return;
	}
	const arr = atob( dataString ).split(' ');
	if(arr.length < 1) {
		return;
	}
	game.time = readObj(arr, 0);
	for(let i = 0; i < game.accelerators.number.length; i++) {
		if(arr.length < 6 * i + 4) {
			return;
		}
		game.accelerators.number[i] = readObj(arr, 6 * i + 2);
		if(arr.length < 6 * i + 6) {
			return;
		}
		game.accelerators.price[i] = readObj(arr, 6 * i + 4);
		if(arr.length < 6 * i + 8) {
			return;
		}
		game.accelerators.speed[i] = readObj(arr, 6 * i + 6);
	}
	for(let i = 0; i < game.upgrades.bought.length; i++) {
		if(arr.length < 52 + 3 * i) {
			return;
		}
		game.upgrades.bought[i] = (parseInt(arr[50 + 3 * i]) == 1);
		if(arr.length < 54 + 3 * i) {
			return;
		}
		game.upgrades.price[i] = readObj(arr, 51 + 3 * i);
	}
}
function isValid() {
	const dataString = localStorage.getItem('CWIG3-player-data');
	if(dataString == null || dataString == '') {
		return false;
	}
	const arr = atob( dataString ).split(' ');
	if(arr.length < consts.dataLength) {
		alert('数据不合法!');
		return false;
	}
	return true;
}