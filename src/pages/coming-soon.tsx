import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppCard, AppCardEmptyState } from "src/components/kolik/app-card";
import { PageHeader } from "src/components/kolik/page-header";
import type { NavItem } from "src/layouts/dashboard/nav-config";
import { paths } from "src/paths";

const ComingSoonPage = ({ item }: { item: NavItem }) => {
  const navigate = useNavigate();

  return (
    <Stack spacing={3}>
      <PageHeader title={item.label} />
      <AppCard>
        <AppCardEmptyState
          icon={<item.icon />}
          title="Coming soon"
          description={item.description}
          action={
            <Button variant="outlined" onClick={() => navigate(paths.overview)}>
              Back to overview
            </Button>
          }
        />
      </AppCard>
    </Stack>
  );
};

export default ComingSoonPage;
