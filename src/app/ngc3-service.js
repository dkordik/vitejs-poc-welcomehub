/* eslint-disable fp/no-mutation */
/* eslint-disable immutable/no-mutation */
/* eslint-disable no-restricted-globals */
import { NGC3API, embeddedConfig } from '../lib/ngc3api/index.js'

const api = new NGC3API(embeddedConfig)

const emit = type => data =>
	self.postMessage({
		type,
		...data
	})

self.onmessage = async msg => {
	const { requestDashboards, requestSearches } = msg.data

	const controller = new AbortController()
	const { signal } = controller

	const all = Promise.all([
		requestDashboards
			? api.getDashboards({ signal }).then(emit('dashboard-listing')).catch(console.warn)
			: {},
		requestSearches
			? api.getSearches({ signal }).then(emit('searches-listing')).catch(console.warn)
			: {}
	])

	await all
}
