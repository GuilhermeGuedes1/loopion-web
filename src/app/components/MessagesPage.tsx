import { MessageSquare, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export function MessagesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-3">Messages</h1>
        <p className="text-muted-foreground text-sm">
          WhatsApp communication with customers
        </p>
      </div>

      <Card className="border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-5">
          <CardTitle className="text-lg">Message Center</CardTitle>
          <CardDescription className="text-sm mt-1">Send automated retention messages</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
            <MessageSquare className="size-8 text-accent" />
          </div>
          <h3 className="mb-2 text-base">WhatsApp Integration</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md mb-8 leading-relaxed">
            Connect your WhatsApp Business account to send automated messages to
            customers who haven't visited in 15+ days.
          </p>
          <Button className="h-11 px-6 bg-accent text-accent-foreground hover:bg-accent/90 font-medium">
            <Send className="size-4 mr-2" />
            Connect WhatsApp
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
