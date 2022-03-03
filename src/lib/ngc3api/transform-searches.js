export const transformFactory = options => async json => {
	const { idToIRL } = options ?? {}
	const { error, msg } = json
	if (error === true) {
		return { error, msg, searches: [] }
	}

	return {
		searches: json.map(search => {
			const { title: name, lastSaved, id } = search

			const lastSavedMs = Date.parse(lastSaved)

			return {
				name: name ?? '',
				irl: idToIRL ? idToIRL(id) : '',
				lastSavedMs: Number.isNaN(lastSavedMs) ? undefined : lastSavedMs
			}
		})
	}
}
