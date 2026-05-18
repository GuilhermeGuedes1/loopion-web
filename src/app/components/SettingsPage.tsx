import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";

export function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-3">Settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage your account and application preferences
        </p>
      </div>

      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-5">
          <CardTitle className="text-lg">Business Information</CardTitle>
          <CardDescription className="text-sm mt-1">Update your business details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="business-name" className="text-foreground/70">Business Name</Label>
            <Input
              id="business-name"
              defaultValue="Loopin"
              className="h-11 bg-input border-border focus-visible:ring-accent"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground/70">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue="hello@loopin.com"
              className="h-11 bg-input border-border focus-visible:ring-accent"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground/70">Phone</Label>
            <Input
              id="phone"
              defaultValue="+1 (555) 000-0000"
              className="h-11 bg-input border-border focus-visible:ring-accent"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-5">
          <CardTitle className="text-lg">Retention Settings</CardTitle>
          <CardDescription className="text-sm mt-1">
            Configure customer retention preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Contact Threshold</Label>
              <p className="text-xs text-muted-foreground">
                Days before marking customer for contact
              </p>
            </div>
            <Input
              type="number"
              defaultValue="15"
              className="w-20 h-10 bg-input border-border focus-visible:ring-accent text-center font-mono"
            />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Automated Messages</Label>
              <p className="text-xs text-muted-foreground">
                Send automatic WhatsApp reminders
              </p>
            </div>
            <Switch className="data-[state=checked]:bg-accent" />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Email Notifications</Label>
              <p className="text-xs text-muted-foreground">
                Receive daily retention reports
              </p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-accent" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="h-11 px-6 bg-accent text-accent-foreground hover:bg-accent/90 font-medium">Save Changes</Button>
      </div>
    </div>
  );
}
