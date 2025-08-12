import { Sidebar } from "@/components/dashboard/Sidebar";
import { PatientTable } from "@/components/dashboard/PatientTable";
import { PatientDetails } from "@/components/dashboard/PatientDetails";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/layout/PageHeader";
import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const Patients = () => {
  const { pid } = useParams<{ pid: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const fromSearch = ((location.state as { from?: string } | undefined)?.from === 'search');
  const [selectedPatient, setSelectedPatient] = useState<string | null>(pid || null);

  // Handle patient selection from table
  const handlePatientSelect = (patientId: string) => {
    setSelectedPatient(patientId);
    navigate(`/patients/${patientId}`, { replace: true, state: { from: 'patients' } });
  };

  // Handle back to patient list
  const handleBackToList = () => {
    setSelectedPatient(null);
    if (fromSearch) {
      navigate('/search', { replace: true });
    } else {
      navigate('/patients', { replace: true });
    }
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
              {fromSearch ? 'Zurück zur Suche' : 'Zurück zur Patientenliste'}
            </Button>
            <PatientDetails patientId={selectedPatient} />
          </div>
        ) : (
          // Patient List View
          <>
            {/* Header */}
            <PageHeader title="Patienten" description="Verwalten Sie alle Patientendaten und deren Testergebnisse." />

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