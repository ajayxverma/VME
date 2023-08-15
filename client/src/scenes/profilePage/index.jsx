import Navbar from "scenes/navbar";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

const ProfilePage = () => {
  return (
    <Box>
      <Navbar />
      <div>Profile Page</div>
    </Box>
  );
};

export default ProfilePage;
