import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Apartment as ApartmentIcon,
  Campaign as CampaignIcon,
  Flag as FlagIcon,
  Home as HomeIcon,
  ManageSearch as ManageSearchIcon,
  MonitorHeart as MonitorHeartIcon,
  Payments as PaymentsIcon,
  People as PeopleIcon,
  ReceiptLong as ReceiptLongIcon,
  Videocam as VideocamIcon,
} from "@mui/icons-material";
import type { SvgIconComponent } from "@mui/icons-material";
import { paths } from "src/paths";

export interface NavItem {
  label: string;
  href: string;
  icon: SvgIconComponent;
  description: string;
  comingSoon?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    title: "General",
    items: [{ label: "Overview", href: paths.overview, icon: HomeIcon, description: "Kolik at a glance" }],
  },
  {
    title: "Customers",
    items: [
      {
        label: "Organizations",
        href: paths.organizations.index,
        icon: ApartmentIcon,
        description: "Plans, limits, apps and status",
      },
      {
        label: "Users",
        href: paths.users.index,
        icon: PeopleIcon,
        description: "Every user across all organizations",
      },
    ],
  },
  {
    title: "Billing & usage",
    items: [
      {
        label: "Billing",
        href: paths.billing,
        icon: PaymentsIcon,
        description: "Turn billing on or off for each organization",
      },
      {
        label: "Usage & costs",
        href: paths.usage,
        icon: ReceiptLongIcon,
        description: "SMS, AI interview minutes and storage per organization, with caps and alerts.",
        comingSoon: true,
      },
    ],
  },
  {
    title: "Product",
    items: [
      {
        label: "Session recording",
        href: paths.sessionRecording,
        icon: VideocamIcon,
        description: "Turn OpenReplay session recording on or off for each organization",
      },
      {
        label: "Feature flags",
        href: paths.featureFlags,
        icon: FlagIcon,
        description: "Roll features out to chosen organizations before everyone gets them.",
        comingSoon: true,
      },
      {
        label: "Announcements",
        href: paths.announcements,
        icon: CampaignIcon,
        description: "Banners and maintenance notices shown inside Kolik.",
        comingSoon: true,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Platform health",
        href: paths.health,
        icon: MonitorHeartIcon,
        description: "Cron jobs, imports, email and SMS delivery, with retries.",
        comingSoon: true,
      },
      {
        label: "Audit log",
        href: paths.auditLog,
        icon: ManageSearchIcon,
        description: "Every super admin action: who did what, to which organization, and when.",
        comingSoon: true,
      },
      {
        label: "Team & roles",
        href: paths.team,
        icon: AdminPanelSettingsIcon,
        description: "Super admins and what each one is allowed to do.",
        comingSoon: true,
      },
    ],
  },
];

export const allNavItems = navSections.flatMap((section) => section.items);
