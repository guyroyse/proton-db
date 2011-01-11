proton.ascending = function(a, b) {
	if (a == b)
		return 0;
	if (a > b)
		return 1;
	return -1;
};

proton.descending = function(a, b) {
	if (a == b)
		return 0;
	if (a > b)
		return -1;
	return 1;
};