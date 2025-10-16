import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="sidebar-gradient">
        <AppSidebar />
      </div>
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
