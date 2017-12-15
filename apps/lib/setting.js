var set = function (settings) {
	console.log(settings, '=>', Matrix.config.settings);

	Object.keys(settings).forEach(k => {
		if (!Matrix.config.settings.hasOwnProperty(k)) {
			return console.error('Cannot add settings which are not registered in the config.yaml : ' + k);
		}
		if (_.isFunction(settings[k]) || _.isPlainObject(settings[k])) {
			return console.error('Settings can only be strings or integers.', k);
		}
	});

	// converge
	_.merge(Matrix.config.settings, settings);

	process.send({
		type: 'update-setting',
		settings: settings
	});

};

module.exports = set;