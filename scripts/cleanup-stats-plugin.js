class CleanUpStatsPlugin {
	constructor(options) {
		this.options = {
			child: [],
		};
		if (options) {
			this.options = { ...this.options, ...options };
		}
	}
	/**
	 * @param {Object} child
	 * @param {string} child.name
	 * @returns {boolean}
	 */
	shouldPickStatChild(child) {
		for (let index = 0; index < this.options.child.length; index++) {
			const name = this.options.child[index];
			if (child.name.indexOf(name) === 0) {
				return false;
			}
		}
		return true;
	}

	apply(compiler) {
		compiler.plugin('done', stats => {
			if (Array.isArray(stats.compilation.children)) {
				stats.compilation.children = stats.compilation.children.filter(child =>
					this.shouldPickStatChild(child),
				);
			}
		});
	}
}

module.exports = CleanUpStatsPlugin;
