export interface OverviewTotals {
  organizations: number;
  paidOrganizations: number;
  trialOrganizations: number;
  suspendedOrganizations: number;
  billingOffOrganizations: number;
  employees: number;
  users: number;
  newOrganizations: number;
  newEmployees: number;
  activeUsers: number;
}

export interface OverviewAttention {
  trialEnding: number;
  trialEnded: number;
  suspended: number;
  seatLimit: number;
  billingOff: number;
}

export interface ModuleCount {
  key: string;
  label: string;
  count: number;
  organizations: number;
}

export interface DailyActivity {
  date: string;
  total: number;
  byModule: Record<string, number>;
}

export interface DailySignups {
  date: string;
  organizations: number;
  employees: number;
}

export interface DailyCount {
  date: string;
  count: number;
}

export interface AppUsage {
  appId: number;
  name: string;
  organizations: number;
}

export interface ActiveOrganization {
  organizationId: number;
  organizationName: string;
  employeeCount: number;
  actions: number;
}

export interface TrendLine {
  name: string;
  data: number[];
}

export interface Overview {
  days: number;
  totals: OverviewTotals;
  attention: OverviewAttention;
  modules: ModuleCount[];
  dailyActivity: DailyActivity[];
  dailySignups: DailySignups[];
  dailyActiveUsers: DailyCount[];
  apps: AppUsage[];
  mostActiveOrganizations: ActiveOrganization[];
  trends: {
    apps: TrendLine[];
    organizations: TrendLine[];
    features: TrendLine[];
  };
}
