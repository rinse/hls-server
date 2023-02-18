import React, {useCallback, useState} from "react";
import {AppBar, AppBarProps, Drawer, DrawerProps, IconButton, Toolbar, ToolbarProps} from "@mui/material";

type AppBarWithDrawerProps = {
  appBarProps?: AppBarProps,
  appBarTitle?: React.ReactNode,
  appBarContent?: React.ReactNode,
  toolbarProps?: ToolbarProps,
  drawerProps?: Omit<Omit<DrawerProps, "open">, "onClose">,
  drawerContent?: React.ReactNode,
  drawerIcon?: React.ReactNode,
}

export function AppBarWithDrawer(props: AppBarWithDrawerProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  return (
    <>
      <AppBar {...props.appBarProps}>
        <Toolbar {...props.toolbarProps}>
          <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={openDrawer}
                      sx={{marginRight: 1}}>
            {props.drawerIcon}
          </IconButton>
          {props.appBarTitle}
          {props.appBarContent}
        </Toolbar>
      </AppBar>
      <Drawer {...props.drawerProps} open={isDrawerOpen} onClose={closeDrawer}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="close drawer" onClick={closeDrawer}
                      sx={{marginRight: 1}}>
            {props.drawerIcon}
          </IconButton>
          {props.appBarTitle}
        </Toolbar>
        {props.drawerContent}
      </Drawer>
    </>
  )
}
