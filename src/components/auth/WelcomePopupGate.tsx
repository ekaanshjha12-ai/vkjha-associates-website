import { createClient } from "@/lib/supabase/server";
import WelcomePopup from "@/components/auth/WelcomePopup";

export default async function WelcomePopupGate() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) return null;

  return <WelcomePopup />;
}
