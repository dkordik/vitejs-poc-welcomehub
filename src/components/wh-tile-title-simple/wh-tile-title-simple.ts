import htmlStr from './wh-tile-title-simple.html?raw'

const PARSE_TYPE_TEXT_HTML = 'text/html'
const TEMPLATE_TAG_NAME = 'template'

export class TileTitleSimple extends HTMLElement {
	constructor() {
		super()
		const template = new DOMParser()
			.parseFromString(htmlStr, PARSE_TYPE_TEXT_HTML)
			?.querySelector(TEMPLATE_TAG_NAME)

		if (template === undefined || template === null) {
			throw new Error('Failed to construct element - no template')
		}

		const { content } = template
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}
