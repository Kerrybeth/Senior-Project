import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import { colorConfigs } from "../components/configs";
import { sizeConfigs } from "../components/configs";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";


export interface LayoutProps  { 
  children: React.ReactNode
}
const MainLayout = (props:LayoutProps) => {

  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      <Box
        component="nav"
        sx={{
          width: sizeConfigs.sidebar.width,
          flexShrink: 0
        }}
      >
        <Sidebar />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${sizeConfigs.sidebar.width})`,
          minHeight: "100vh",
          backgroundColor: colorConfigs.mainBg
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};

export default MainLayout;