import React, {useCallback} from "react"
import {Button, Container, Divider, List, ListItemButton} from "@mui/material";
import {Menu as MenuIcon} from "@mui/icons-material";
import {createBrowserRouter, useSearchParams, RouterProvider, Link, useNavigate} from "react-router-dom"
import Theatre from "./components/Theatre"
import PlaylistContainer from "./components/containers/PlaylistContainer";
import {AppBarWithDrawer} from "./components/appbar/AppBarWithDrawer";

function RootElement() {
  return (
    <>
      <MyAppBar/>
      <Container>
        <PlaylistContainer/>
      </Container>
    </>
  )
}

function WatchElement() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  return (
    <>
      <MyAppBar/>
      {videoId === null
        ? <>A video id is not given. Back to <Link to="/">Home</Link>.</>
        : (
          <Container>
            <Theatre video={videoId}/>
          </Container>
        )
      }
    </>
  )
}

export function MyAppBar() {
  const navigate = useNavigate();
  const navigateToRoot = useCallback(() => navigate("/"), [navigate]);
  return (
    <AppBarWithDrawer
      appBarProps={{position: "static", sx: {backgroundColor: "#20232a"}, elevation: 0}}
      appBarTitle={<Button onClick={navigateToRoot} sx={{color: "inherit"}}>HLS Server</Button>}
      drawerIcon={<MenuIcon/>}
      drawerContent={(
        <List>
          <ListItemButton>Hello</ListItemButton>
          <ListItemButton>World</ListItemButton>
          <Divider/>
        </List>
      )}
    />
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootElement/>,
  }, {
    path: "/watch",
    element: <WatchElement/>,
  }
]);

export default function App() {
  return <RouterProvider router={router}/>
}
