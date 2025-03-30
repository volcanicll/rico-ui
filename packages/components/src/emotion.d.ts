import "@emotion/react";
import { Theme as RicoTheme } from "./theme";

declare module "@emotion/react" {
  export interface Theme extends RicoTheme {}
}
