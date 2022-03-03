const SEARCH_LI = 'li'
const DASHBOARD_LI = 'li'
const TOP_CONTENT_LI = 'li'

function setUlItems(ulElem, liElemList, existingLiNameSelector) {
	ulElem.querySelectorAll(existingLiNameSelector)?.forEach(li => li.remove())
	liElemList.forEach(li => ulElem.appendChild(li))
}

function createBasicListItem(topElement, { name, irl, whenMs }) {
	const li = document.createElement(topElement)
	const listItem = document.createElement('wh-basic-list-item')
	const aElem = document.createElement('a')
	const nameNode = document.createTextNode(name)
	const dateTimeElem = document.createElement('wh-date-time-display')

	aElem.setAttribute('href', irl)
	aElem.setAttribute('slot', 'primary')

	dateTimeElem.setAttribute('when-ms', whenMs)
	dateTimeElem.setAttribute('slot', 'secondary')

	aElem.appendChild(nameNode)
	listItem.appendChild(aElem)
	listItem.appendChild(dateTimeElem)
	li.appendChild(listItem)
	return li
}

function createSearchListItem(topElement, searchItem) {
	const { name, irl, lastSavedMs: whenMs } = searchItem
	return createBasicListItem(topElement, { name, irl, whenMs })
}

function createDashboardListItem(topElement, dashboardItem) {
	const { name, irl, lastViewedMs: whenMs } = dashboardItem
	return createBasicListItem(topElement, { name, irl, whenMs })
}

export class UI {
	static from(options) {
		const { searchUl, dashboardUl, topContentUl } = options

		return {
			updateSearchesList: data => {
				if (data.searches === undefined) {
					return
				}

				setUlItems(
					searchUl,
					data.searches.map(search => createSearchListItem(SEARCH_LI, search)),
					SEARCH_LI
				)
			},
			updateDashboardsList: data => {
				if (data.dashboards === undefined) {
					return
				}
				setUlItems(
					dashboardUl,
					data.dashboards.map(dashboard => createDashboardListItem(DASHBOARD_LI, dashboard)),
					DASHBOARD_LI
				)
			},
			updateTopContentList: data =>
				setUlItems(
					topContentUl,
					data.topContent.map(topContent => {
						const li = document.createElement(TOP_CONTENT_LI)
						li.textContent = topContent.name
						return li
					}),
					TOP_CONTENT_LI
				)
		}
	}
}
