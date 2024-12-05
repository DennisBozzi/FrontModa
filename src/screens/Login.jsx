import React, { useState } from 'react'
import leaf from '../assets/leaf.png'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import PageTitle from '@/components/PageTitle'
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom'
import { showSuccessToast, showErrorToast } from '@/components/ui/showToast'
import { useToast } from "@/components/ui/use-toast"
import { LoaderCircle } from 'lucide-react'

export function Login() {

  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, senha);
      navigate('/Produtos');
      toast(showSuccessToast('Login efetuado', 'Seja bem vindo!'));
    } catch (e) {
      setLoading(false);
      toast(showErrorToast('Falha no login', e.message));
    }
  };

  return (<div className="w-screen h-screen flex items-center justify-center">
    <PageTitle title="Login" />
    <Tabs defaultValue="login" className="w-[400px] relative">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Entrar</TabsTrigger>
        <TabsTrigger value="registro" disabled>Registrar</TabsTrigger>
      </TabsList>
      <img src={leaf} alt="" className="w-28 absolute -top-36 right-36" />
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>
              Preencha os campos Email e Senha. Depois, confirme para se conectar.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@teste.com"
                  disabled={isLoading}
                  value={email} required
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="senha" disabled={isLoading}>Senha</Label>
                <Input id="senha" type="password" placeholder="•••••••••••"
                  disabled={isLoading}
                  value={senha} required
                  onChange={(e) => setSenha(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-start">
              <Button className="w-full" type="submit" disabled={isLoading}>
                <LoaderCircle
                  className={isLoading ? "mr-2 h-4 w-4 animate-spin" : "hidden"} />
                {isLoading ? "Carregando..." : "Entrar"}
              </Button>
            </CardFooter>
          </form>

        </Card>
      </TabsContent>

      <TabsContent value="registro">
        <Card>
          <CardHeader>
            <CardTitle>Registrar</CardTitle>
            <CardDescription>
              Preencha os campos Email e Senha. Depois, confirme para se registrar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="novoEmail">Email</Label>
              <Input id="novoEmail" type="email" placeholder="email@teste.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="novaSenha">Senha</Label>
              <Input id="novaSenha" type="password" placeholder="•••••••••••" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-start">
            <Button className="w-full">Registrar</Button>
          </CardFooter>
        </Card>
      </TabsContent>

    </Tabs>
  </div>
  )
}
