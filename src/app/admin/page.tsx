"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { adminLogin, isAdminLoggedIn } from "@/lib/store";
import { Eye, EyeOff, Lock } from "lucide-react";

const B = "#70090F", B2 = "#560008", BL = "#FFE9DF", IV = "#F8F6E7";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show,     setShow]     = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  // Already logged in → skip to dashboard
  useEffect(() => {
    if (isAdminLoggedIn()) router.replace("/admin/dashboard");
  }, [router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (adminLogin(password)) {
        router.replace("/admin/dashboard");
      } else {
        setError("Incorrect password. Please try again.");
        setLoading(false);
      }
    }, 400);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#1A0A0A" }}>
      {/* subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%,rgba(112,9,15,.18),transparent)" }} />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl mb-2" style={{ fontFamily: "'TheSeasons',Georgia,serif", color: "#ffffff", letterSpacing: "0.08em" }}>
            Become.ing
          </h1>
          <p className="text-[10px] tracking-[.35em]" style={{ color: "rgba(255,233,223,.4)" }}>
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <div className="p-8 sm:p-10" style={{ background: IV }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 flex items-center justify-center" style={{ background: B }}>
              <Lock size={16} className="text-white" />
            </div>
            <div>
              <p className="text-xs tracking-[.3em]" style={{ color: B }}>Restricted Access</p>
              <p className="text-[10px] tracking-[.15em]" style={{ color: "#4A4A4A" }}>Enter your admin password to continue</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] tracking-[.3em] mb-2" style={{ color: "#4A4A4A" }}>Password</label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter admin password"
                  autoFocus
                  className="w-full text-sm pr-10 px-4 py-3 focus:outline-none transition-colors"
                  style={{ background: "#fff", border: `1px solid ${error ? B : "rgba(112,9,15,.2)"}`, color: "#2C2C2C" }}
                  onFocus={e => (e.target.style.borderColor = B)}
                  onBlur={e => (e.target.style.borderColor = error ? B : "rgba(112,9,15,.2)")}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "rgba(112,9,15,.5)" }}>
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && <p className="text-[10px] tracking-[.1em] mt-2" style={{ color: B }}>{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full text-white text-xs tracking-[.3em] py-3.5 transition-all disabled:opacity-50"
              style={{ background: loading ? B2 : B }}>
              {loading ? "Verifying..." : "Enter Admin Panel"}
            </button>
          </form>

          <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(112,9,15,.12)" }}>
            <p className="text-[10px] text-center tracking-[.15em]" style={{ color: "rgba(74,74,74,.5)" }}>
              This area is restricted to authorised administrators only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
