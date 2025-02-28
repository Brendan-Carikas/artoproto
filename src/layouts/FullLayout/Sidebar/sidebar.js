import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { SidebarWidth } from "../../../assets/global/Theme-variable";
import LogoIcon from "../Logo/LogoIcon";
import Menuitems from "./data";

const Sidebar = (props) => {
  const { pathname } = useLocation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const SidebarContent = (
    <Box sx={{ p: 3, height: "calc(100vh - 40px)" }}>
      <Link
        to="/app/dashboards/dashboard1"
        style={{ textDecoration: "none", color: "inherit" }}
        onClick={() => !lgUp && props.onSidebarClose?.()}
      >
        <Box sx={{ display: "flex", alignItems: "Center", cursor: "pointer" }}>
          <LogoIcon />
        </Box>
      </Link>

      <List sx={{ mt: 4 }}>
        {Menuitems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.title}
              to={item.href}
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => !lgUp && props.onSidebarClose?.()}
            >
              <ListItem
                sx={{
                  mb: 1,
                  cursor: "pointer",
                  borderRadius: 1,
                  ...(isActive && {
                    backgroundColor: "#1C1362",
                    color: "white",
                    "& .MuiListItemIcon-root": {
                      color: "white",
                    },
                  }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: "40px",
                  }}
                >
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={props.isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: SidebarWidth,
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      PaperProps={{
        sx: {
          width: SidebarWidth,
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

export default Sidebar;
