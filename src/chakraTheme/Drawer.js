import { drawerAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(drawerAnatomy.keys);

const deepSkyBlue = definePartsStyle({
    // define the part you're going to style
    dialog: {
        bg: `linear-gradient(180deg, #19619A 0%, #023F6F 100%) !important`,
    },
});

const deepNavyBlue = definePartsStyle({
    dialog: {
        bg: `linear-gradient(180deg, #043155 0%, #001D34 100%) !important`,
        overflowY: "auto",
    },
});

export const drawerTheme = defineMultiStyleConfig({
    variants: { deepSkyBlue, deepNavyBlue },
});
