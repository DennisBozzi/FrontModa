import React, { useEffect } from "react";
import { MenuNavigation } from "./MenuNavigation";
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
import { useProdutosData } from "@/hooks/useProdutosData";

export function Produtos() {

  // Format Price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
  };

  // Get dos Produtos
  const { data, error, isLoading } = useProdutosData();

  useEffect(() => {
    if (!isLoading)
      console.log(data);
  }, [data]);

  // Ajustando a tabela
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

  // Return
  return <>
    <MenuNavigation>
      <main className="items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="todos">
          <div className="flex place-content-between">
            <TabsList>
              <TabsTrigger onClick={() => ajustar()} value="todos">Todos</TabsTrigger>
              <TabsTrigger value="estoque">Estoque</TabsTrigger>
              <TabsTrigger value="vendidos">Vendidos</TabsTrigger>
            </TabsList>

            <Button size="sm" className="h-7 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Novo Produto
              </span>
            </Button>
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
                      <TableHead>Status</TableHead>
                      <TableHead>Preço</TableHead>
                    </TableRow>

                  </TableHeader>

                  <TableBody>
                    {/* Map com os produtos da requisição */}

                    {!isLoading && data.objeto.map((produto) => (
                      <TableRow key={produto.id}>
                        <TableCell className="font-medium">{produto.id}</TableCell>
                        <TableCell className="font-medium">{produto.nome}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{produto.vendido ? 'Vendido' : 'Estoque'}</Badge>
                        </TableCell>
                        <TableCell>{formatPrice(produto.preco)}</TableCell>
                      </TableRow>
                    ))
                    }



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