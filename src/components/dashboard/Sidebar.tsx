import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  TestTubes,
  FileText,
  Calendar,
  Settings,
  Activity,
  TrendingUp,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/patients", label: "Patienten", icon: Users },
  { href: "/search", label: "Suche", icon: Search },
  { href: "/tests", label: "Tests", icon: TestTubes },
  { href: "/results", label: "Ergebnisse", icon: FileText },
  { href: "/appointments", label: "Termine", icon: Calendar },
  { href: "/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/quality", label: "Qualität", icon: UserCheck },
  { href: "/monitoring", label: "Monitoring", icon: Activity },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "bg-card border-r transition-all duration-300 relative",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
            G
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg text-foreground">GANZIMMUN</h2>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 h-6 w-6 rounded-full border bg-background"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </Button>
      </div>
      
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-primary text-primary-foreground",
                collapsed && "justify-center"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-lg bg-accent",
          collapsed && "justify-center"
        )}>
          <Settings className="h-5 w-5 text-accent-foreground" />
          {!collapsed && (
            <span className="text-sm font-medium text-accent-foreground">Einstellungen</span>
          )}
        </div>
      </div>
    </div>
  );
}