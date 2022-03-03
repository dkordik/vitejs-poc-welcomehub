/* eslint-disable spellcheck/spell-checker */
/* eslint-disable fp/no-mutation */
/* eslint-disable immutable/no-mutation */
/* eslint-disable import/no-internal-modules */

import style from './welcome-hub-embedded.css'
import { appSetup } from './appSetup.js'
import { NGC3API, embeddedConfig } from '../lib/ngc3api/index.js'
import templateStr from './template.html?raw'

const ATTRIBUTE_BASE_IRL = 'base-irl'
const PARSE_TYPE_TEXT_HTML = 'text/html'
const TEMPLATE_TAG_NAME = 'template'

class Element extends HTMLElement {
	static get observedAttributes() {
		return [ATTRIBUTE_BASE_IRL]
	}

	static async baseIrlUpdate(element) {
		const { uiDataHandler, attributes } = element
		const baseIRL = attributes['base-irl']?.value

		const config = {
			...embeddedConfig,
			dashboardsIrl: `${baseIRL}${embeddedConfig.dashboardsIrl}`,
			searchesIrl: `${baseIRL}${embeddedConfig.searchesIrl}`
		}
		const api = new NGC3API(config)

		const controller = new AbortController()
		const { signal } = controller

		const all = Promise.all([
			api.getDashboards({ signal }).then(uiDataHandler('dashboard-listing')).catch(console.warn),
			api.getSearches({ signal }).then(uiDataHandler('searches-listing')).catch(console.warn)
		])

		await all
	}

	constructor() {
		super()

		const template = new DOMParser()
			.parseFromString(templateStr, PARSE_TYPE_TEXT_HTML)
			?.querySelector(TEMPLATE_TAG_NAME)
		const { content } = template

		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))

		const styleElem = document.createElement('style')
		styleElem.appendChild(document.createTextNode(style))
		shadowRoot.appendChild(styleElem)

		this.uiDataHandler = appSetup(shadowRoot)
	}

	attributeChangedCallback(name) {
		if (name === ATTRIBUTE_BASE_IRL) {
			Element.baseIrlUpdate(this).catch(console.warn)
		}
	}
}

export default Element
