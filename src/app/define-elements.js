import { Button } from '../components/button/button.js'
import { Tile } from '../components/tile/tile.ts'
// eslint-disable-next-line max-len
import { TileTitleSimple } from '../components/wh-tile-title-simple/wh-tile-title-simple.ts'
import { WelcomeHub } from '../components/welcome-hub/welcome-hub.ts'
import { Dashboard } from '../components/dashboard/dashboard.ts'
import { BasicListItem } from '../components/basic-list-item/basic-list-item.ts'
import { TileTitleMultiline } from '../components/wh-tile-title-multiline/wh-tile-title-multiline.ts'
import { DateTimeDisplay } from '../components/date-time-display/wh-date-time-display.js'

export async function defineElements() {
	customElements.define('welcome-hub', WelcomeHub)
	customElements.define('wh-tile', Tile)
	customElements.define('wh-button', Button)
	customElements.define('wh-tile-dashboard', Dashboard)
	customElements.define('wh-tile-title-simple', TileTitleSimple)
	customElements.define('wh-tile-title-multiline', TileTitleMultiline)
	customElements.define('wh-basic-list-item', BasicListItem)
	customElements.define('wh-date-time-display', DateTimeDisplay)
}
