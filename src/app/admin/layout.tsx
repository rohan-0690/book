"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAdminLoggedIn } from "@/lib/store";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Login page itself is always accessible
    if (pathname === "/admin") {
      setChecked(true);
      return;
    }
    if (!isAdminLoggedIn()) {
      router.replace("/admin");
    } else {
      setChecked(true);
    }
  }, [pathname, router]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F8F6E7" }}>
        <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{ borderColor: "#70090F", borderTopColor: "transparent" }} />
      </div>
    );
  }

  return <>{children}</>;
}
