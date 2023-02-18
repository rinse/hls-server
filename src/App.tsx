import React, {PropsWithChildren} from "react";
import {Box, Container} from "@mui/material";
import {createBrowserRouter, useSearchParams, RouterProvider, Link} from "react-router-dom";
import Theatre from "./components/Theatre";
import PlaylistContainer from "./components/containers/PlaylistContainer";

function RootElement() {
  return (
    <MyContainer>
      <PlaylistContainer/>
    </MyContainer>
  )
}

function WatchElement() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  return videoId === null
    ? <>A video id is not given. Back to <Link to="/">Home</Link>.</>
    : (
      <MyContainer>
        <Theatre video={videoId}/>
      </MyContainer>
    )
}

function MyContainer(props: PropsWithChildren<{}>) {
  return (
    <Container>
      <Box sx={{marginTop: 6}}>
        {props.children}
      </Box>
    </Container>
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
  return (
    <RouterProvider router={router}/>
  )
}
