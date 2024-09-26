
import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(tableAnatomy.keys)

const baseStyle = definePartsStyle({
	// https://chakra-ui.com/docs/components/table/theming
	td: {
		borderColor: {
			_dark: "grey !important" // this does'nt not "work" but triggers the right behavior. Theres something strange to this base styling
		},
	},
	th: {
		position: "sticky",
		top: 0,
		backgroundColor: "#1e253f",
		zIndex: 99
	}
});

export const tableTheme = defineMultiStyleConfig({ baseStyle })