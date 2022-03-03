/* eslint-disable fp/no-mutation */
/* eslint-disable immutable/no-mutation */
export class NGC3API {
	constructor(options) {
		const identity = i => i

		this.dashboardsIrl = options.dashboardsIrl
		this.searchesIrl = options.searchesIrl

		this.fetchJson = options.fetchJson

		this.transforms = {
			dashboards: options.transforms?.dashboards ?? identity,
			searches: options.transforms?.searches ?? identity
		}
	}

	async getDashboards(options) {
		const result = await this.fetchJson(this.dashboardsIrl, options)
		return this.transforms.dashboards(result)
	}

	async getSearches(options) {
		const result = await this.fetchJson(this.searchesIrl, options)
		return this.transforms.searches(result)
	}

	async getTopContent() {
		throw new Error('not implemented')
	}

	async getTopJournalist() {
		throw new Error('not implemented')
	}
}
