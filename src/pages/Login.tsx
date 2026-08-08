import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import Logo from "../components/common/Logo";

type Mode = "email" | "phone";

export default function Login() {
  const [mode, setMode] = useState<Mode>("email");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className="container-page flex min-h-[80vh] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-card">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center text-xl font-extrabold text-ink">Welcome back</h1>
        <p className="mt-1 text-center text-sm text-ink-muted">Sign in to continue to your account</p>

        <div className="mt-6 flex rounded-full bg-surface p-1">
          <button
            onClick={() => setMode("email")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === "email" ? "bg-white text-ink shadow-sm" : "text-ink-muted"
            }`}
          >
            <Mail size={14} /> Email
          </button>
          <button
            onClick={() => setMode("phone")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === "phone" ? "bg-white text-ink shadow-sm" : "text-ink-muted"
            }`}
          >
            <Phone size={14} /> Phone
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "email" ? (
            <input required type="email" placeholder="Email address" className="input-field" />
          ) : (
            <input required type="tel" placeholder="Phone number" className="input-field" />
          )}

          <div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-ink-muted">
              <input type="checkbox" className="h-3.5 w-3.5 rounded border-border text-primary" />
              Remember me
            </label>
            <Link to="#" className="font-semibold text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
          >
            <Lock size={15} />
            Sign In
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-ink-faint">or continue with</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {["Google", "Apple", "Facebook"].map((provider) => (
            <button
              key={provider}
              className="flex items-center justify-center rounded-xl border border-border py-3 text-xs font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
            >
              {provider}
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-ink-muted">
          New to Vendora?{" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}