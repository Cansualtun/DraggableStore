import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "@/utils/authUtils";
import toast from "react-hot-toast";
const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("isAuthenticated");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = validateUser(formData.email, formData.password);
      navigate("/");
      toast.success("Hoşgeldiniz!");
      if (!user) {
        navigate("/login");
      } else {
        navigate("/");
      }
    } catch {
      toast.error("bir şey hatalı");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Hoş Geldiniz</CardTitle>
          <CardDescription>
            Hesabınıza giriş yapmak için email ve şifrenizi giriniz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ornek@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="remember">Beni hatırla</Label>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Giriş Yap
            </Button>
          </form>
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
            <p className="font-semibold mb-2">Test Kullanıcıları:</p>
            <ul className="space-y-1 text-gray-600 dark:text-gray-300">
              <li>Email: admin@example.com / Şifre: ******</li>
              <li>Email: user@example.com / Şifre: ******</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
