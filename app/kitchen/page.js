import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/kitchen");
  }

  if (session.role !== "STAFF") {
    return (
      <main className="page-container">
        <div className="error-card">
          <span className="error-code">403</span>

          <h1>Forbidden</h1>

          <p>You do not have permission to access the kitchen.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="page-header">
        <p className="eyebrow">Staff Dashboard</p>

        <h1>Kitchen</h1>

        <p>Manage Addis Eats orders.</p>
      </div>

      <div className="staff-card">
        <h2>Kitchen Order Management</h2>

        <p>Staff-only functionality goes here.</p>
      </div>
    </main>
  );
}
