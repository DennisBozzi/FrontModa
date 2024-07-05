import React, { useEffect } from "react";
import { MenuNavigation } from "./MenuNavigation";
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function Produtos() {
  useEffect(() => {
    function ajustarTabela() {
      const mainElement = document.getElementById("tablePai");
      if (mainElement) {
        const availableHeight = mainElement.clientHeight;
        const windowHeight = window.innerHeight;
        const offsetTop = mainElement.getBoundingClientRect().top;

        if (offsetTop + availableHeight > windowHeight) {
          mainElement.style.height = `${windowHeight - offsetTop - 20}px`;
        }
      }
    }

    ajustarTabela();
    window.addEventListener("resize", ajustarTabela);

    return () => {
      window.removeEventListener("resize", ajustarTabela);
    };
  }, []);

  return <>
    <MenuNavigation>
      <main className="items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="todos">
          <div className="flex place-content-between">
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
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
                  Gerencia os preços e as informações dos produtos.
                </CardDescription>
              </CardHeader>
              <CardContent id="tablePai" className="overflow-y-auto">
                <Table id="table">

                  <TableHeader>

                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead className="w-[120px]">Opções</TableHead>
                    </TableRow>

                  </TableHeader>

                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium"> Bermuda </TableCell>
                      <TableCell>
                        <Badge variant="outline">Vendido</Badge>
                      </TableCell>
                      <TableCell>15</TableCell>
                      <TableCell className="flex gap-2">
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Editar</span>
                        </Button>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Excluir</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    

                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
    </MenuNavigation >
  </>
}