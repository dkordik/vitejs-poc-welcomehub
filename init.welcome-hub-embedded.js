/* eslint-disable import/no-internal-modules */

import WelcomeHubEmbedded from './src/packaged-app/welcome-hub-embedded.js'

if (!customElements.get('welcome-hub-embedded')) {
	customElements.define('welcome-hub-embedded', WelcomeHubEmbedded)
}
