import { Box, CircularProgress } from "@mui/material";

const Spinner = () => (
  <Box alignItems="center" bottom={0} display="flex" justifyContent="center" position="absolute" top={0} width="100%" zIndex={1}>
    <CircularProgress />
  </Box>
);

export { Spinner };
