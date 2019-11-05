function reset () {
	var canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
}