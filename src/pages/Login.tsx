import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn, ArrowLeft, Mail } from "lucide-react";
import lovhackLogo from "@/assets/lovhack-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast({ title: "Welcome back!", description: "You've been signed in." });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Invalid credentials.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setResetSent(true);
      toast({ title: "Reset email sent", description: "Check your inbox for a password reset link." });
    } catch (error: any) {
      toast({
        title: "Failed to send reset email",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <Link to="/">
              <img src={lovhackLogo} alt="LovHack" className="h-10 mb-4" />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">
              {forgotMode ? "Reset your password" : "Welcome back"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {forgotMode
                ? resetSent
                  ? "Check your email for a reset link"
                  : "Enter your email to receive a reset link"
                : "Sign in to your account"}
            </p>
          </div>

          {forgotMode ? (
            resetSent ? (
              <div className="text-center space-y-4">
                <Mail className="w-12 h-12 text-primary mx-auto" />
                <p className="text-sm text-muted-foreground">
                  We've sent a password reset link to <strong>{resetEmail}</strong>. Check your inbox and follow the instructions.
                </p>
                <Button variant="outline" className="w-full rounded-xl" onClick={() => { setForgotMode(false); setResetSent(false); }}>
                  Back to Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="you@example.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full rounded-xl" disabled={resetLoading}>
                  <Mail className="w-4 h-4 mr-2" />
                  {resetLoading ? "Sending..." : "Send Reset Link"}
                </Button>
                <Button variant="ghost" className="w-full rounded-xl" onClick={() => setForgotMode(false)}>
                  Back to Sign In
                </Button>
              </form>
            )
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button
                      type="button"
                      onClick={() => { setForgotMode(true); setResetEmail(email); }}
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full rounded-xl" disabled={loading}>
                  <LogIn className="w-4 h-4 mr-2" />
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </div>
            </>
          )}

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
