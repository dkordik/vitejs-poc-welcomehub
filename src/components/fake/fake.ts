import htmlStr from './fake.html?raw'

const PARSE_TYPE_TEXT_HTML = 'text/html'
const TEMPLATE_TAG_NAME = 'template'

export class Fake extends HTMLElement {
	constructor() {
		super()

		// using baked in template loading (not component static)
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

	connectedCallback() {} // appended into a document

	disconnectedCallback() {}

	adoptedCallback() {}

	attributeChangedCallback(_name, _oldValue, _newValue) {}
}
