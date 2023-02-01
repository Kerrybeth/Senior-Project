import { colors } from "@mui/material";
import { ReactNode } from "react";

export type RouteType = {
  element: ReactNode,
  state: string,
  index?: boolean,
  path?: string,
  child?: RouteType[],
  sidebarProps?: {
    displayText: string,
    icon?: ReactNode;
  };
};

export const colorConfigs = {
  sidebar: {
    bg: "#233044",
    color: "#eeeeee",
    hoverBg: "#1e293a",
    activeBg: "#1e253a"
  },
  topbar: {
    bg: "#fff",
    color: "#000"
  },
  mainBg: colors.grey["100"]
};

export const sizeConfigs = {
    sidebar: {
      width: "250px"
    }
  };