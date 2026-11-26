import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { paths } from "src/paths";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Stack alignItems="center" spacing={1.5} sx={{ py: 12 }}>
      <Typography variant="h1" color="primary">
        404
      </Typography>
      <Typography variant="h5">Page not found</Typography>
      <Typography color="text.secondary">This page doesn't exist.</Typography>
      <Button variant="contained" onClick={() => navigate(paths.overview)} sx={{ mt: 2 }}>
        Go to overview
      </Button>
    </Stack>
  );
};

export default NotFoundPage;
