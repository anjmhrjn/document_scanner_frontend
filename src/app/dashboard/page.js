"use client";

import ProtectedRoute from "../../components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-xl font-bold">Protected Dashboard</h1>
      </div>
    </ProtectedRoute>
  );
}
