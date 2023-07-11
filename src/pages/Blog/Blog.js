import React from 'react';
import Post from "../../component/Post/Post";
import Topbar from "../../component/Dashboard/Topbar";
import Sidebar from "../../component/Dashboard/Sidebar";
import Container from '@mui/material/Container';
import { Box, Typography } from "@mui/material";

const Blog = () => {
  return (
    <div className="app">
    <Sidebar />
      <main className='content'>
        <Topbar />
        <Box sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
          }}>
          <Typography
            variant="h2"
            // color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "5px 25px" }}
          >
             Safari Kidz         
            </Typography>
            <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
                <Post/>
            </Container>
        </Box>
    </main>
    </div>
  )
}

export default Blog