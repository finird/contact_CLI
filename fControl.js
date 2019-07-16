const fs = require(`fs`);
var file = {
	open: function () {
		let a = fs.readFileSync('./data.json', {encoding: 'utf-8', flag: 'a+'});
		if (!a) {
			return [];
		}
		return JSON.parse(a);
	},

	close: function (data) {
		fs.writeFileSync ('./data.json', JSON.stringify(data));
	}
}

module.exports = file;
