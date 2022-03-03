const DASHBOARDS_PATH_SLASH_TERMINATED = '#/dashboard/'
const SEARCHES_PATH_SLASH_TERMINATED = 'earned-searches/simple/'

const joinIdForDashboards = id => `${DASHBOARDS_PATH_SLASH_TERMINATED}${id}`
const joinIdForSearches = id => `${SEARCHES_PATH_SLASH_TERMINATED}${id}`

// tryParse
function isValidBaseIRL(baseIRL) {
	try {
		const _validator = new URL('', baseIRL)
		return true
	} catch (_e) {
		// suppress
	}

	return false
}

class IdToIRLUtil {
	static fromAbsolute(options) {
		const { baseIRL, joinId } = options

		if (!isValidBaseIRL(baseIRL)) {
			throw new Error('baseIRL is not valid')
		}

		if (typeof joinId !== 'function') {
			throw new Error('joinId is not a function')
		}

		return id => new URL(joinId(id), baseIRL).href
	}

	static fromRelative(options) {
		const { joinId } = options

		if (typeof joinId !== 'function') {
			throw new Error('joinId is not a function')
		}

		return id => joinId(id)
	}
}

export { joinIdForDashboards, joinIdForSearches, IdToIRLUtil }
