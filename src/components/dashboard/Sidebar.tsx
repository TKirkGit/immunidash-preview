import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, TestTubes, FileText, Calendar, Settings, Activity, TrendingUp, UserCheck, ChevronLeft, ChevronRight, Search, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
const navItems = [{
  href: "/",
  label: "Dashboard",
  icon: LayoutDashboard
}, {
  href: "/patients",
  label: "Patienten",
  icon: Users
}, {
  href: "/search",
  label: "Suche",
  icon: Search
}, {
  href: "/update",
  label: "Update",
  icon: TrendingUp
}, {
  href: "/tests",
  label: "Tests",
  icon: TestTubes
}, {
  href: "/geraete",
  label: "Geräte",
  icon: Cpu
}];
interface SidebarProps {
  className?: string;
}
export function Sidebar({
  className
}: SidebarProps) {
  const STORAGE_KEY = "sidebar:collapsed";
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const location = useLocation();
  return <div className={cn("bg-card border-r transition-all duration-500 ease-in-out relative", collapsed ? "w-18" : "w-64", className)}>
      <div className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#0053a1] rounded-lg flex items-center justify-center text-white font-bold leading-none transition-all duration-300">
  <span className="text-[1.15rem] tracking-[0.01em]">H</span>
</div>
          <div className={cn("overflow-hidden transition-all duration-500 ease-in-out", collapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>
            <div className="whitespace-nowrap">
              <h2 className="font-bold text-lg text-foreground">HL7Viewer</h2>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => {
        const next = !collapsed;
        setCollapsed(next);
        try {
          localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
        } catch {}
      }} className="absolute -right-3 top-6 h-6 w-6 rounded-full border bg-background transition-all duration-300 hover:scale-110">
          <div className="transition-transform duration-300">
            {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          </div>
        </Button>
      </div>
      
      <nav className="p-4 space-y-2">
        {navItems.map(item => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;
        return <Link key={item.href} to={item.href} className={cn("flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-accent hover:text-accent-foreground", isActive && "bg-primary text-primary-foreground scale-105", collapsed && "justify-center")}>
              <Icon className="h-6 w-6 flex-shrink-0 transition-transform duration-300" />
              <span className={cn("text-sm font-medium transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap", collapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>{item.label}</span>
            </Link>;
      })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <Link to="/settings" className={cn("flex items-center gap-3 p-3 rounded-lg bg-accent hover:bg-accent/90 transition-all duration-300 hover:scale-105", collapsed && "justify-center")}>
          <Settings className="h-5 w-5 text-accent-foreground transition-transform duration-300" />
          <span className={cn("text-sm font-medium text-accent-foreground transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap", collapsed ? "w-0 opacity-0" : "w-auto opacity-100")}>Einstellungen</span>
        </Link>
      </div>
    </div>;
}