import { Sidebar } from "@/components/dashboard/Sidebar";
import { PatientTable } from "@/components/dashboard/PatientTable";
import { 
  Users, 
  Search,
  Calendar,
  Bell,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Patients = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Patienten</h1>
            <p className="text-muted-foreground">Verwalten Sie alle Patientendaten und deren Testergebnisse.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Patient suchen..." 
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Neuer Patient
            </Button>
          </div>
        </div>

        {/* Patient Table */}
        <div className="grid grid-cols-1 gap-6">
          <PatientTable />
        </div>

      </main>
    </div>
  );
};

export default Patients;