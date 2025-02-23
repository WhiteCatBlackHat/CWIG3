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
	// console.log(str);
	// console.log(btoa(str));
	return btoa(str);
}
function readObj(arr, index) {
	return new bigNum( parseFloat(arr[index]), parseFloat(arr[index + 1]) );
}
function readData(dataString) {
	if(typeof(dataString) != 'string') {
		alert('数据类型错误!');
	}
	const arr = atob( dataString ).split(' ');
	game.time = readObj(arr, 0);
	for(let i = 0; i < game.accelerators.number.length; i++) {
		game.accelerators.number[i] = readObj(arr, 6 * i + 2);
		game.accelerators.price[i] = readObj(arr, 6 * i + 4);
		game.accelerators.speed[i] = readObj(arr, 6 * i + 6);
	}
}