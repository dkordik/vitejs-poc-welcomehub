import { Button } from '@johncision/applejacks'
import templateStr from '../../../node_modules/@johncision/applejacks/templates/button.html?raw'

Button.template = new DOMParser()
	.parseFromString(templateStr, 'text/html')
	?.querySelector('template')

export { Button }
