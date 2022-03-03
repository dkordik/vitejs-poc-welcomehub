const ATTRS = { WHEN_MS: 'when-ms' }
const OBSERVED_ATTRIBUTES = [ATTRS.WHEN_MS]
const INVALID_TEXT = ''
const DEFAULT_TEXT = ''
const BASE_10 = 10
const EN_US = 'en-US'

export class DateTimeDisplay extends HTMLElement {
	static get observedAttributes() {
		return OBSERVED_ATTRIBUTES
	}

	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
	}

	getDefaultText() {
		return DEFAULT_TEXT
	}

	attributeChangedCallback(name, _oldValue, newValue) {
		if (!OBSERVED_ATTRIBUTES.includes(name)) {
			return
		}

		const dateNumber = parseInt(newValue, BASE_10)
		if (Number.isNaN(dateNumber) || !Number.isInteger(dateNumber)) {
			this.shadowRoot.textContent = INVALID_TEXT
			return
		}

		const epochDate = new Date(dateNumber)
		if (Number.isNaN(epochDate.getTime())) {
			this.shadowRoot.textContent = INVALID_TEXT
			return
		}

		this.shadowRoot.textContent = new Intl.DateTimeFormat(EN_US, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).format(epochDate)
	}
}
