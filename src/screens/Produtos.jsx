import React, { useEffect, useState } from "react";
import { MenuNavigation } from "./MenuNavigation";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useProdutosData } from "@/hooks/useProdutosData";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProdutoMutate } from "@/hooks/useProdutoMutate";
import { LoaderCircle } from 'lucide-react'
import { showSuccessToast, showErrorToast } from '@/components/ui/showToast'
import { useToast } from "@/components/ui/use-toast"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";


export function Produtos() {

  const [novoNome, setNovoNome] = useState("");
  const [novoPreco, setNovoPreco] = useState("");
  const [loadingPost, setLoadingPost] = useState(false);
  const [lastId, setLastId] = useState(0);
  const { toast } = useToast();

  const handleNomeChange = (e) => {
    setNovoNome(e.target.value);
  };

  const handlePrecoChange = (e) => {
    setNovoPreco(e.target.value);
  };

  // Format Price ----
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
  };

  // Get/Post dos Produtos ----
  const { data, isLoading } = useProdutosData();
  const { mutate, isSuccess } = useProdutoMutate((id) => {
    setLastId(id);
  });

  // Adicionar novo Produto ----
  const submit = async () => {
    setLoadingPost(true);
    const data = {
      nome: novoNome,
      preco: novoPreco.replace(",", ".")
    }
    console.log(data);
    mutate(data)
  }

  useEffect(() => {
    if (isSuccess) {
      toast(showSuccessToast(lastId, novoNome + ', foi cadastrado com sucesso! R$' + novoPreco));
      setNovoNome("");
      setNovoPreco("");
      setLoadingPost(false);
    }
  }, [isSuccess]);

  // Ajustando a tabela ----
  useEffect(() => {
    function ajustarTabela() {
      ajustar();
    }
    ajustarTabela();
    window.addEventListener("resize", ajustarTabela);
    return () => {
      window.removeEventListener("resize", ajustarTabela);
    };
  }, []);

  function ajustar() {
    const mainElement = document.getElementById("tablePai");
    const windowHeight = window.innerHeight;
    const offsetTop = mainElement.getBoundingClientRect().top;
    mainElement.style.height = `${windowHeight - offsetTop - 20}px`;
  }

  // Return ----
  return <>
    <MenuNavigation>
      <main className="items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="todos">
          <div className="flex place-content-between">

            {/* Botões para escolher as tabelas */}
            <TabsList>
              <TabsTrigger onClick={() => ajustar()} value="todos">Todos</TabsTrigger>
              <TabsTrigger value="estoque">Estoque</TabsTrigger>
              <TabsTrigger value="vendidos">Vendidos</TabsTrigger>
            </TabsList>

            {/* Dialog para adicionar novo produto*/}
            <Dialog handler={false}>
              <DialogTrigger asChild>
                <Button onClick={() => { setNovoNome(""); setNovoPreco(""); }} size="sm" className="h-7 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Novo Produto
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Novo Produto</DialogTitle>
                  <DialogDescription>
                    Escreva o nome e o preço do novo produto
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center">
                    <Label htmlFor="nome">Nome</Label>
                    <Input maxlength="38" value={novoNome} onChange={handleNomeChange} disabled={loadingPost} id="nome" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <Label htmlFor="preco">Preço</Label>
                    <Input maxlength="7" value={novoPreco} onChange={handlePrecoChange} disabled={loadingPost} id="preco" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => submit()}>
                    <LoaderCircle
                      className={loadingPost ? "mr-2 h-4 w-4 animate-spin" : "hidden"} />
                    {loadingPost ? "Carregando..." : "Salvar"}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>


          </div>

          <TabsContent value="todos">
            <Card>
              <CardHeader>
                <CardTitle>Produtos</CardTitle>
                <CardDescription>
                  Gerencie os preços e as informações dos produtos.
                </CardDescription>
              </CardHeader>
              <CardContent id="tablePai" className="overflow-y-auto">
                <Table id="table">

                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Preço</TableHead>
                    </TableRow>
                  </TableHeader>

                  {/* Map com os produtos da requisição */}
                  <TableBody>
                    {!isLoading && data.objeto.map((produto) => (
                      <TableRow key={produto.id}>
                        <TableCell className="font-medium">{produto.id}</TableCell>
                        <TableCell className="font-medium">{produto.nome}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline">{produto.vendido ? 'Vendido' : 'Estoque'}</Badge>
                        </TableCell>
                        <TableCell className="text-center">{formatPrice(produto.preco)}</TableCell>
                      </TableRow>
                    )) || isLoading && Array.from({ length: 18 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell><Skeleton className="w-4 h-4"></Skeleton></TableCell>
                        <TableCell><Skeleton className="w-28 h-4"></Skeleton></TableCell>
                        <TableCell><Skeleton className="w-16 h-4"></Skeleton></TableCell>
                        <TableCell><Skeleton className="w-8 h-4"></Skeleton></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="estoque">
            <h1>Salame</h1>
          </TabsContent>

        </Tabs>
      </main>
    </MenuNavigation >
  </>
}