import { Users, Calendar, MessageSquare, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { generateMockCustomers, generateMockVisits, isEligibleForContact, calculateDaysSinceVisit } from "../lib/utils";
import { Badge } from "./ui/badge";

export function Dashboard() {
  const customers = generateMockCustomers();
  const visits = generateMockVisits();
  const customersToContact = customers.filter((c) => isEligibleForContact(c.lastVisit));
  const totalVisits = customers.reduce((sum, c) => sum + c.totalVisits, 0);

  const recentActivity = visits.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-3">Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Real-time overview of your customer retention performance
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <Users className="size-4 text-foreground/70" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tracking-tight">{customers.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Active customer base
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Visits</CardTitle>
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <Calendar className="size-4 text-foreground/70" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tracking-tight">{totalVisits}</div>
            <p className="text-xs text-muted-foreground mt-2">
              All-time visits recorded
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Needs Contact</CardTitle>
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <MessageSquare className="size-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tracking-tight">{customersToContact.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              15+ days since last visit
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Retention Rate</CardTitle>
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <TrendingUp className="size-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tracking-tight">87%</div>
            <p className="text-xs text-accent mt-2 flex items-center gap-1">
              <span>↑</span> +2.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription className="text-sm">Latest customer visits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {recentActivity.map((visit) => (
                <div key={visit.id} className="flex items-center justify-between pb-4 border-b border-border/40 last:border-0 last:pb-0">
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium leading-none">
                      {visit.customerName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {visit.notes}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {visit.date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Retention Overview</CardTitle>
            <CardDescription className="text-sm">Customers requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {customersToContact.slice(0, 5).map((customer) => (
                <div key={customer.id} className="flex items-center justify-between pb-4 border-b border-border/40 last:border-0 last:pb-0">
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium leading-none">
                      {customer.name}
                    </p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {customer.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-mono border-accent/40 text-accent bg-accent/5">
                      {calculateDaysSinceVisit(customer.lastVisit)}d
                    </Badge>
                  </div>
                </div>
              ))}
              {customersToContact.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <TrendingUp className="size-5 text-accent" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    All customers are engaged!
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
