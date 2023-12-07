import {
  Palette as MuiPalette,
  PaletteOptions as MuiPaletteOptions,
} from '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  export interface Palette extends MuiPalette {
    customColors: {
      [index: string]: string;
    };
  }
}
