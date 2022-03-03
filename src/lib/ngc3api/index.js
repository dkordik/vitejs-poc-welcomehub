import { NGC3API } from './ngc3api.js'
import { transformFactory as dashboardsTransform } from './transform-dashboards.js'
import { fetchNGC3 as fetchJson } from './ngc3fetch.js'
import { IdToIRLUtil, joinIdForDashboards, joinIdForSearches } from './idToIrl.js'
import { transformFactory as searchesTransform } from './transform-searches.js'

const BASE_IRL = 'https://dev.trendkite.com/'
const idToAbsoluteIRLForDashboards = IdToIRLUtil.fromAbsolute({
	baseIRL: BASE_IRL,
	joinId: joinIdForDashboards
})
const idToAbsoluteIRLForSearches = IdToIRLUtil.fromAbsolute({
	baseIRL: BASE_IRL,
	joinId: joinIdForSearches
})

const idToRelativeIdForDashboards = IdToIRLUtil.fromRelative({ joinId: joinIdForDashboards })
const idToRelativeIdForSearches = IdToIRLUtil.fromRelative({ joinId: joinIdForSearches })

const baseConfig = {
	fetchJson
}

const embeddedConfig = {
	...baseConfig,

	dashboardsIrl: '/api/v2/dashboard',
	searchesIrl: '/api/v2/search?ignoreKeyMessages=true&skipTranslate=true',

	transforms: {
		dashboards: dashboardsTransform({ idToIRL: idToRelativeIdForDashboards }),
		searches: searchesTransform({ idToIRL: idToRelativeIdForSearches })
	}
}

const standaloneConfig = {
	...baseConfig,

	dashboardsIrl: 'https://	/api/v2/dashboard',
	searchesIrl: 'https://	/api/v2/search',

	transforms: {
		dashboards: dashboardsTransform({ idToIRL: idToAbsoluteIRLForDashboards }),
		searches: searchesTransform({ idToIRL: idToAbsoluteIRLForSearches })
	}
}

export { embeddedConfig, standaloneConfig, NGC3API }
