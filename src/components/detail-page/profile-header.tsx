import type { ReactNode } from "react";
import { Avatar, Box, Typography } from "@mui/material";

interface ProfileHeaderProps {
  name: string;
  image?: string | null;
  initials: string;
  lines: ReactNode[];
  action?: ReactNode;
}

const ProfileHeader = ({ name, image, initials, lines, action }: ProfileHeaderProps) => {
  const [first, second] = lines.filter(Boolean);

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ position: "relative", mr: 3 }}>
          <Avatar
            src={image ?? undefined}
            sx={{ width: 80, height: 80, bgcolor: "primary.main", fontSize: "2rem" }}
          >
            {initials}
          </Avatar>
        </Box>
        <Box>
          <Typography variant="h5" component="h2" gutterBottom>
            {name}
          </Typography>
          {first && (
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {first}
            </Typography>
          )}
          {second && (
            <Typography variant="body2" color="text.secondary">
              {second}
            </Typography>
          )}
        </Box>
      </Box>
      {action}
    </Box>
  );
};

export default ProfileHeader;
