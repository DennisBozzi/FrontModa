import cat from '../assets/cat.png'
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

export function Login() {
  return (<div className="w-screen h-screen flex items-center justify-center">



    <Tabs defaultValue="login" className="w-[400px] relative">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Entrar</TabsTrigger>
        <TabsTrigger value="registro">Registrar</TabsTrigger>
      </TabsList>
      <img src={cat} alt="" className="w-28 absolute -top-28 right-36" />
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>
              Preencha os campos Email e Senha. Depois, confirme para se conectar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@teste.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="senha">Senha</Label>
              <Input id="senha" type="password" placeholder="•••••••••••" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-start">
            <Button className="w-full">Entrar</Button>
          </CardFooter>
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
