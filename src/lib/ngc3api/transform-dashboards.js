export const transformFactory = options => async json => {
	const { idToIRL } = options ?? {}
	const { results, error, msg } = json
	if (error === true) {
		return { error, msg, dashboards: [] }
	}

	return {
		dashboards: results.map(dashboard => {
			const { title: name, lastViewed, id } = dashboard

			const lastViewedMs = Date.parse(lastViewed)

			return {
				name: name ?? '',
				irl: idToIRL ? idToIRL(id) : '',
				lastViewedMs: Number.isNaN(lastViewedMs) ? undefined : lastViewedMs
			}
		})
	}
}
