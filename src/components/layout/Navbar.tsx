import { createClient } from "@/lib/supabase/server";
import NavbarClient from "@/components/layout/NavbarClient";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let navUser = null;

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    navUser = {
      email: user.email ?? "",
      fullName: (user.user_metadata?.full_name as string | undefined) ?? null,
      isAdmin: profile?.role === "admin",
    };
  }

  return <NavbarClient user={navUser} />;
}
