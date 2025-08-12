import { Sidebar } from "@/components/dashboard/Sidebar";
import { PatientTable } from "@/components/dashboard/PatientTable";
import { PatientDetails } from "@/components/dashboard/PatientDetails";
import { 
  Users, 
  Search,
  Calendar,
  Bell,
  Plus,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Patients = () => {
  const { pid } = useParams<{ pid: string }>();
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState<string | null>(pid || null);

  // Handle patient selection from table
  const handlePatientSelect = (patientId: string) => {
    setSelectedPatient(patientId);
    navigate(`/patients/${patientId}`, { replace: true });
  };

  // Handle back to patient list
  const handleBackToList = () => {
    setSelectedPatient(null);
    navigate('/patients', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <main className="flex-1 p-6 space-y-6">
        {selectedPatient ? (
          // Patient Details View
          <div className="space-y-6">
            <Button 
              variant="ghost" 
              onClick={handleBackToList}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zur Patientenliste
            </Button>
            <PatientDetails patientId={selectedPatient} />
          </div>
        ) : (
          // Patient List View
          <>
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
              <PatientTable onPatientSelect={handlePatientSelect} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Patients;