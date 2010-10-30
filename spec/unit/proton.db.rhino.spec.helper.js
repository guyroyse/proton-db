window = {}
window.localStorage = {}
window.localStorage.removeItem = function(key) {
	window.localStorage[key] = undefined
}
