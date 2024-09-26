import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const filled = definePartsStyle({
  control: {
    width: "24px",
    height: "24px",
    borderRadius: "4px",
    backgroundColor: "#001D34",
    border: "1px solid #7D8488",
    "& svg": {
      width: "16px !important",
      stroke: "#001D34 !important",
    },
  },
  label: {
    fontSize: "16px",
    fontWeight: 500,
    marginLeft: "16px",
  },
});

const outlined = definePartsStyle({
  control: {
    width: "24px",
    height: "24px",
    borderRadius: "4px",
    border: "2px solid #E0E1EC !important",
    "& svg": {
      width: "16px !important",
      stroke: "#001D34 !important",
    },
  },
  label: {
    fontSize: "16px",
    fontWeight: 500,
    marginLeft: "16px",
  },
});

export const checkboxTheme = defineMultiStyleConfig({
  variants: { filled, outlined },
});
