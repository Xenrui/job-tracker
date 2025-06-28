import React, { useEffect, useState } from "react";
import ApplicationCard from "./ApplicationCard";
import ActivityList from "./ActivityList";
import ApplicationForm from "./ApplicationForm";
import HeaderPanel from "./Header";
import API_BASE_URL from "../../config";

const HomePanel = () => {
  const [activities, setActivities] = useState({
    Applied: [],
    Interviewed: [],
    Offered: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchActivities = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/get_activities.php`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load activities");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  if (loading) return <p className="p-6">Loading activities...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Main content will be dimmed and non-interactable when modal is open */}
      <div className={showAddForm ? "pointer-events-none opacity-40 select-none" : ""}>
        {/* Top Panel */}
        <HeaderPanel onButtonClick={() => setShowAddForm(true)} />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-20 pt-8">
          <ApplicationCard
            title="Total Applications"
            count={
              activities.Applied.length +
              activities.Interviewed.length +
              activities.Offered.length
            }
          />
          <ApplicationCard
            title="Pending Applications"
            count={activities.Applied.length}
          />
        </div>

        {/* Activity Lists - show only latest 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-20 py-8 min-h-[500px]">
          <ActivityList
            statusTitle="Recently Applied"
            status="Applied"
            activities={activities.Applied.slice(0, 3)}
          />
          <ActivityList
            statusTitle="Recently Interviewed"
            status="Interviewed"
            activities={activities.Interviewed.slice(0, 3)}
          />
          <ActivityList
            statusTitle="Recently Offered"
            status="Offered"
            activities={activities.Offered.slice(0, 3)}
          />
        </div>
      </div>

      {/* Modal Backdrop and Form */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <ApplicationForm
            onCancel={() => setShowAddForm(false)}
            onSuccess={() => {
              fetchActivities();
              setShowAddForm(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default HomePanel;