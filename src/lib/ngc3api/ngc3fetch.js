export async function fetchNGC3(irl, options) {
	const { signal } = options ?? {}

	const paramIrl = irl
	const _params = new URLSearchParams()

	return fetch(paramIrl, {
		signal,
		method: 'GET',
		mode: 'cors'
		// 'X-Auth-Token': 'needs to be set?'
	})
		.then(result => {
			if (signal?.aborted === true) {
				return { error: false, msg: 'aborted' }
			}
			if (!result.ok) {
				return { error: true, msg: 'not ok' }
			}

			return result.json().catch(_e => ({ error: true, msg: 'json error' }))
		})
		.catch(_e => {
			if (signal?.aborted === true) {
				return { error: false, msg: 'aborted' } // TODO error true?
			}

			return { error: true, msg: 'network error' }
		})
}
