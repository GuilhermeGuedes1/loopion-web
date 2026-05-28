import { Link, Outlet, useLocation } from "react-router-dom";
import { Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { useAuth } from "../../../contexts/auth-context";
import { Button } from "../ui/button";

const navigation = [{ name: "Customers", href: "/customers", icon: Users }];

export function DashboardLayout() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar>
          <SidebarContent className="">
            <SidebarGroup>
              <div className="px-6 py-6">
                <div className="inline-flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full" />
                  </div>
                  <div>
                    <p className="text-base font-semibold tracking-tight">
                      Loopin
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Customer hub
                    </p>
                  </div>
                </div>
              </div>
              <SidebarGroupContent className="mt-2 px-3">
                <SidebarMenu className="gap-1">
                  {navigation.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.href}
                        className="h-9 px-3 text-sm font-medium data-[active=true]:bg-accent data-[active=true]:text-accent-foreground hover:bg-muted/50 transition-colors">
                        <Link to={item.href}>
                          <item.icon className="size-4" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1 min-w-0 flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 bg-background/80 backdrop-blur-xl px-4 sm:px-8">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-5" />
            <div className="flex-1">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground">
                  {user?.organizationName}
                </p>
                <p className="text-white font-semibold">Olá, {user?.name}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-muted-foreground hover:bg-muted/50 cursor-pointer">
              Logout
            </Button>
          </header>
          <main className="flex-1 p-8 max-w-[1600px] w-full mx-auto">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
