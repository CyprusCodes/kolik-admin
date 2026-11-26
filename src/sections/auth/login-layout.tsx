import type { ReactNode } from "react";
import { Box, Card, CardContent, Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { KolikLogo } from "src/layouts/dashboard/logo";

const LayoutRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top center",
  backgroundImage: 'url("/assets/gradient-bg.svg")',
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  minHeight: "100vh",
}));

interface LoginLayoutProps {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}

const LoginLayout = ({ title, subtitle, children }: LoginLayoutProps) => (
  <LayoutRoot>
    <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", flex: "1 1 auto" }}>
      <Container maxWidth="sm" sx={{ py: { xs: "60px", md: "120px" } }}>
        <Card elevation={16}>
          <CardContent>
            <Stack alignItems="center" direction="row" sx={{ pb: 2, height: 56 }}>
              <Box width={140} sx={{ color: "text.primary" }}>
                <KolikLogo />
              </Box>
            </Stack>
            <Box sx={{ borderBottom: 1, borderColor: "#D2D6DB" }} />
            <Box sx={{ pt: 3, pb: 2 }}>
              <Typography variant="h5">{title}</Typography>
              {subtitle && (
                <Typography color="text.secondary" variant="body2" sx={{ mt: 0.5 }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
            {children}
          </CardContent>
        </Card>
      </Container>
    </Box>
  </LayoutRoot>
);

export default LoginLayout;
