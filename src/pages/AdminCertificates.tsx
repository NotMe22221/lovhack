import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy, ExternalLink, Save, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";

interface Certificate {
  id: string;
  certificate_id: string;
  recipient_name: string | null;
  recipient_email: string | null;
  certificate_type: string;
  hackathon_name: string | null;
  issuer_name: string | null;
  pdf_url: string | null;
  image_url: string | null;
  issued_at: string | null;
}

const certificateTypes = [
  { value: "participant", label: "Participant" },
  { value: "winner_1", label: "1st Place Winner" },
  { value: "winner_2", label: "2nd Place Winner" },
  { value: "winner_3", label: "3rd Place Winner" },
  { value: "winner_4", label: "4th Place Winner" },
  { value: "winner_5", label: "5th Place Winner" },
  { value: "winner_6", label: "6th Place Winner" },
  { value: "winner_7", label: "7th Place Winner" },
  { value: "winner_8", label: "8th Place Winner" },
  { value: "winner_9", label: "9th Place Winner" },
  { value: "winner_10", label: "10th Place Winner" },
];

const AdminCertificates = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Certificate>>({});

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(session.user.id);
          }, 0);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminRole = async (userId: string) => {
    const { data, error } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });

    if (data === true) {
      setIsAdmin(true);
      fetchCertificates();
    } else {
      setIsAdmin(false);
      setIsLoading(false);
    }
  };

  const fetchCertificates = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("certificate_id", { ascending: true });

    if (error) {
      toast.error("Failed to fetch certificates");
      console.error(error);
    } else {
      setCertificates(data || []);
    }
    setIsLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const startEditing = (cert: Certificate) => {
    setEditingId(cert.id);
    setEditForm({
      recipient_name: cert.recipient_name || "",
      recipient_email: cert.recipient_email || "",
      certificate_type: cert.certificate_type,
      pdf_url: cert.pdf_url || "",
      image_url: cert.image_url || "",
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveCertificate = async (id: string) => {
    const { error } = await supabase
      .from("certificates")
      .update({
        recipient_name: editForm.recipient_name || null,
        recipient_email: editForm.recipient_email || null,
        certificate_type: editForm.certificate_type as any,
        pdf_url: editForm.pdf_url || null,
        image_url: editForm.image_url || null,
      })
      .eq("id", id);

    if (error) {
      toast.error("Failed to save certificate");
      console.error(error);
    } else {
      toast.success("Certificate saved!");
      setEditingId(null);
      setEditForm({});
      fetchCertificates();
    }
  };

  const deleteCertificate = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;

    const { error } = await supabase
      .from("certificates")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete certificate");
      console.error(error);
    } else {
      toast.success("Certificate deleted!");
      fetchCertificates();
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 bg-card rounded-lg border shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            <Link to="/" className="hover:underline">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">
            You don't have admin privileges to access this page.
          </p>
          <Button onClick={() => supabase.auth.signOut()}>Sign Out</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Certificate Management</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[280px]">Certificate ID</TableHead>
                  <TableHead>Recipient Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>PDF URL</TableHead>
                  <TableHead>Image URL</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certificates.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="truncate max-w-[180px]">
                          {cert.certificate_id}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            copyToClipboard(
                              `https://lovhack.lovable.app/certificate/${cert.certificate_id}`
                            )
                          }
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Link
                          to={`/certificate/${cert.certificate_id}`}
                          target="_blank"
                        >
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>

                    {editingId === cert.id ? (
                      <>
                        <TableCell>
                          <Input
                            value={editForm.recipient_name || ""}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                recipient_name: e.target.value,
                              })
                            }
                            placeholder="Recipient name"
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={editForm.certificate_type}
                            onValueChange={(value) =>
                              setEditForm({ ...editForm, certificate_type: value })
                            }
                          >
                            <SelectTrigger className="h-8 w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {certificateTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editForm.pdf_url || ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, pdf_url: e.target.value })
                            }
                            placeholder="/certificates/name.pdf"
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editForm.image_url || ""}
                            onChange={(e) =>
                              setEditForm({ ...editForm, image_url: e.target.value })
                            }
                            placeholder="/certificates/name.jpg"
                            className="h-8"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              onClick={() => saveCertificate(cert.id)}
                            >
                              <Save className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={cancelEditing}
                            >
                              Cancel
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>
                          <span
                            className={
                              cert.recipient_name
                                ? "text-foreground"
                                : "text-muted-foreground italic"
                            }
                          >
                            {cert.recipient_name || "Not set"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {certificateTypes.find(
                            (t) => t.value === cert.certificate_type
                          )?.label || cert.certificate_type}
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              cert.pdf_url
                                ? "text-green-600 text-xs"
                                : "text-muted-foreground italic text-xs"
                            }
                          >
                            {cert.pdf_url ? "✓ Set" : "Not set"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              cert.image_url
                                ? "text-green-600 text-xs"
                                : "text-muted-foreground italic text-xs"
                            }
                          >
                            {cert.image_url ? "✓ Set" : "Not set"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEditing(cert)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:text-destructive"
                              onClick={() => deleteCertificate(cert.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            Total certificates: {certificates.length} |{" "}
            Assigned: {certificates.filter((c) => c.recipient_name).length} |{" "}
            Available: {certificates.filter((c) => !c.recipient_name).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminCertificates;
