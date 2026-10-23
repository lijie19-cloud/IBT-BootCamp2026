import ProfileView from "@/components/auth/ProfileView";

export const metadata = { title: "Your profile" };
export default function ProfilePage() { return <main className="protected-page"><ProfileView /></main>; }
