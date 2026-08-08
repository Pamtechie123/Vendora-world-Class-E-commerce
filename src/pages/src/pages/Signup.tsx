import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import Logo from "../../../components/common/Logo";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
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
        <h1 className="mt-6 text-center text-xl font-extrabold text-ink">Create your account</h1>
        <p className="mt-1 text-center text-sm text-ink-muted">Join Vendora and start shopping smarter</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input required placeholder="Full name" className="input-field" />
          <input required type="email" placeholder="Email address" className="input-field" />
          <input required type="tel" placeholder="Phone number" className="input-field" />

          <div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
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

          <label className="flex items-start gap-2.5 text-xs text-ink-muted">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
              className="mt-0.5 h-3.5 w-3.5 rounded border-border text-primary"
            />
            I agree to Vendora's Terms &amp; Conditions and Privacy Policy
          </label>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
          >
            <UserPlus size={15} />
            Create Account
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-ink-faint">or sign up with</span>
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
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}