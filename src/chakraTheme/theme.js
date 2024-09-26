
import { extendTheme } from '@chakra-ui/react'
import { mode } from "@chakra-ui/theme-tools";
import { tableTheme } from './Table'
import { drawerTheme } from './Drawer';
import { checkboxTheme } from './Checkbox';

const customTheme = {
  config: {
    initialColorMode: 'dark', // 'dark' | 'light'
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('#f6f6f6', '#181921')(props),
      }
    }),
  },
  components: {
    Table: tableTheme,
    Drawer: drawerTheme,
    Checkbox: checkboxTheme,
  },
};

const theme = extendTheme(customTheme)

export default theme
