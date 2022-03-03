import { UI } from '../app/ui.js'
import { defineElements } from '../app/define-elements.js'

export function appSetup(rootNode) {
	defineElements()

	const ui = UI.from({
		searchUl: rootNode.getElementById('searchesList'),
		dashboardUl: rootNode.getElementById('dashboardsList'),
		topContentUl: rootNode.getElementById('topContentList')
	})

	const handlers = {
		'searches-listing': data => ui.updateSearchesList(data),
		'dashboard-listing': ui.updateDashboardsList,
		'top-content-listing': ui.updateTopContentList
	}

	const handler = type => data => {
		const typeHandler = handlers[type]
		if (typeHandler === undefined || typeof typeHandler !== 'function') {
			console.warn('unknown type', type)
			return
		}
		typeHandler(data)
	}

	return handler
}
