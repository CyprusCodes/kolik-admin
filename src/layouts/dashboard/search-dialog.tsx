import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { Apartment as ApartmentIcon } from "@mui/icons-material";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import XIcon from "@untitled-ui/icons-react/build/esm/X";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import getOrganizations from "src/services/organizations/getOrganizations";
import { paths } from "src/paths";
import { allNavItems } from "./nav-config";
import { onOpenSearch } from "./search-store";

export const SearchDialog = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { data } = useQuery({
    queryKey: ["organizations", "search"],
    queryFn: () => getOrganizations({ pageSize: 500 }).then((response) => response.data.organizations),
    enabled: open,
  });

  useEffect(() => onOpenSearch(() => setOpen(true)), []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const term = value.trim().toLowerCase();
  const organizations = useMemo(
    () =>
      (data ?? []).filter((org) => !term || org.organizationName.toLowerCase().includes(term)).slice(0, 8),
    [data, term],
  );
  const pages = allNavItems.filter(
    (item) => !item.comingSoon && (!term || item.label.toLowerCase().includes(term)),
  );

  const close = () => {
    setOpen(false);
    setValue("");
  };

  const go = (to: string) => {
    close();
    navigate(to);
  };

  return (
    <Dialog fullWidth maxWidth="sm" onClose={close} open={open}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={3}
        sx={{ px: 3, py: 2 }}
      >
        <Typography variant="h6">Search</Typography>
        <IconButton color="inherit" onClick={close} aria-label="Close search">
          <SvgIcon>
            <XIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
      <DialogContent sx={{ pt: 0 }}>
        <Box sx={{ mt: 1 }}>
          <TextField
            autoFocus
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon>
                    <SearchMdIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            label="Search"
            onChange={(event) => setValue(event.target.value)}
            placeholder="Organizations and pages..."
            value={value}
          />
        </Box>
        <List sx={{ mt: 2 }} disablePadding>
          {organizations.length > 0 && <ListSubheader disableSticky>Organizations</ListSubheader>}
          {organizations.map((org) => (
            <ListItemButton
              key={org.organizationId}
              onClick={() => go(paths.organizations.detail(org.organizationId))}
              sx={{ borderRadius: 1 }}
            >
              <ListItemIcon>
                <ApartmentIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={org.organizationName}
                secondary={[
                  org.country,
                  org.planType === "paid" ? "Paid" : "Trial",
                  `${org.employeeCount} employees`,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              />
            </ListItemButton>
          ))}
          {pages.length > 0 && <ListSubheader disableSticky>Pages</ListSubheader>}
          {pages.map((item) => (
            <ListItemButton key={item.href} onClick={() => go(item.href)} sx={{ borderRadius: 1 }}>
              <ListItemIcon>
                <item.icon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={item.label} secondary={item.description} />
            </ListItemButton>
          ))}
          {organizations.length === 0 && pages.length === 0 && (
            <Typography color="text.secondary" variant="body2" sx={{ py: 3, textAlign: "center" }}>
              Nothing found
            </Typography>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};
