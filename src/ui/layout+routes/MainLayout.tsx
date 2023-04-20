import { Box, Toolbar } from "@mui/material";
import { sizeConfigs } from "../components/configs";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

export interface LayoutProps {
  children: React.ReactNode
}
const MainLayout = (props: LayoutProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
          backgroundColor: colors.main[100]
        }}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};

export default MainLayout;