import { UI } from './app/ui.js'
import { defineElements } from './app/define-elements.js'

function onContentLoaded() {
	defineElements()

	const ui = UI.from({
		searchUl: document.getElementById('searchesList'),
		dashboardUl: document.getElementById('dashboardsList'),
		topContentUl: document.getElementById('topContentList')
	})

	const handlers = {
		'searches-listing': data => ui.updateSearchesList(data),
		'dashboard-listing': ui.updateDashboardsList,
		'top-content-listing': ui.updateTopContentList
	}

	const handler = msg => {
		const { data } = msg
		const { type } = data
		const typeHandler = handlers[type]
		if (typeHandler === undefined || typeof typeHandler !== 'function') {
			console.warn('unknown message type', type)
			return
		}
		typeHandler(data)
	}

	//
	const ngc3Worker = new Worker('./app/ngc3-service.js', { type: 'module' })
	ngc3Worker.onmessage = e => handler(e)
	ngc3Worker.onmessageerror = e => console.log('message error', e)
	ngc3Worker.onerror = e => console.warn(e)

	// assume business logic - load now
	ngc3Worker.postMessage({ requestSearches: true, requestDashboards: true })
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', onContentLoaded)
} else {
	onContentLoaded()
}
