import React, { useEffect, useState, useRef } from "react"
import MenuNavigation from "./MenuNavigation"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useProdutosData } from "@/hooks/useProdutosData"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProdutoMutate } from "@/hooks/useProdutoMutate"
import { LoaderCircle } from 'lucide-react'
import { showSuccessToast, showWarningToast } from '@/components/ui/showToast'
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import FormattedPriceInput from "@/components/ui/price-input"
import { formatPrice, handleNomeChange, handleInputChange } from "@/utils/utils"
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
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function Produtos() {

  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [novoNome, setNovoNome] = useState("")
  const [novoPreco, setNovoPreco] = useState("")
  const [loadingPost, setLoadingPost] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [tipoProduto, setTipoProduto] = useState(1)
  const [nomeFiltro, setNomeFiltro] = useState("")
  const inputPage = useRef(null)
  const { data, isLoading, isError } = useProdutosData(currentPage, tipoProduto, nomeFiltro)
  const { mutate, isSuccess, isLoading: isLoadingMutate } = useProdutoMutate()
  const inputSearch = useRef(null)
  const { toast } = useToast()

  const submit = async (e) => {
    e.preventDefault();
    setLoadingPost(true);
    const data = {
      nome: novoNome,
      preco: novoPreco.toString().replace(',', '.'),
    }
    if (isDialogOpen) {
      data.id = produtoSelecionado?.id
    }
    mutate(data)
  }

  useEffect(() => {
    if (isDialogOpen) {
      setNovoNome(produtoSelecionado?.nome)
      setNovoPreco(produtoSelecionado?.preco)
    }
  }, [isDialogOpen])

  useEffect(() => {
    if (isSuccess && !isLoadingMutate) {
      if (isDialogOpen) {
        toast(showSuccessToast(novoNome, 'Produto alterado com sucesso! R$' + novoPreco));
      }
      if (!isDialogOpen) {
        toast(showSuccessToast(novoNome, 'Produto cadastrado com sucesso! R$' + novoPreco));
      }
      setNovoNome("");
      setNovoPreco("");
      setLoadingPost(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    inputPage.current.value = ''; inputSearch.current.value = ''
    if (!isLoading) {
      setLastPage(data.objeto.pageTotal)
    }
  }, [tipoProduto]);

  useEffect(() => { setCurrentPage(1); if (!isLoading) { setLastPage(data.objeto.pageTotal) } }, [nomeFiltro]);
  useEffect(() => { if (!isLoading) { setLastPage(data.objeto.pageTotal) } }, [isLoading]);

  return <>
    <MenuNavigation onSearch={(e) => (handleInputChange(e, setNomeFiltro))} ref={inputSearch}>
      <main className="items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="todos">
          <div className="flex place-content-between">

            {/* Botões para escolher as tabelas */}
            <TabsList>
              <TabsTrigger value="todos" onClick={() => (setNomeFiltro(''), setCurrentPage(1), setTipoProduto(1))}>Todos</TabsTrigger>
              <TabsTrigger value="estoque" onClick={() => (setNomeFiltro(''), setCurrentPage(1), setTipoProduto(2))}>Estoque</TabsTrigger>
              <TabsTrigger value="vendido" onClick={() => (setNomeFiltro(''), setCurrentPage(1), setTipoProduto(3))}>Vendidos</TabsTrigger>
            </TabsList>

            {/* Dialog para adicionar novo produto*/}
            <Dialog handler={false}>
              <DialogTrigger asChild >
                <Button onClick={() => { setNovoNome(""); setNovoPreco(""); }} size="sm" className="h-7 gap-1 ">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Novo Produto
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent>

                <form onSubmit={submit}>
                  <DialogHeader>
                    <DialogTitle>Novo Produto</DialogTitle>
                    <DialogDescription>
                      Escreva o nome e o preço do novo produto
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center">
                      <Label htmlFor='nome'>Nome</Label>
                      <Input id='nome' maxLength={38} placeholder='Produto' value={novoNome} onChange={(e) => (handleNomeChange(e, setNovoNome))} disabled={loadingPost} required className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center">
                      <Label htmlFor='preco'>Preço</Label>
                      <FormattedPriceInput
                        id='preco'
                        placeholder='0,00'
                        value={novoPreco}
                        onChange={setNovoPreco}
                        maxLength={10}
                        disabled={loadingPost}
                        customInput={Input}
                        required className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">
                      <LoaderCircle className={loadingPost ? "mr-2 h-4 w-4 animate-spin" : "hidden"} />
                      {loadingPost ? "Carregando..." : "Salvar"}
                    </Button>
                  </DialogFooter>
                </form>

              </DialogContent>
            </Dialog>

          </div>

          {/* Todos */}
          <TabsContent value="todos">
            <Card>
              <CardHeader>
                <CardTitle>Todos os Produtos</CardTitle>
                <CardDescription>
                  Gerencie os preços e as informações dos produtos.
                </CardDescription>
              </CardHeader>
              <CardContent className="tabela overflow-y-auto">
                <Table id="table">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/12">#</TableHead>
                      <TableHead className="w-2/6">Nome</TableHead>
                      <TableHead className="text-center w-2/6">Status</TableHead>
                      <TableHead className="text-center w-2/6">Preço</TableHead>
                    </TableRow>
                  </TableHeader>

                  {/* Body */}
                  <TableBody>
                    {!isLoading && !isError ? (
                      data.objeto.data.map((produto) => (
                        <TableRow key={produto.id} onClick={() => (setProdutoSelecionado(produto), setIsDialogOpen(true))}>
                          <TableCell className="font-medium">{produto.id}</TableCell>
                          <TableCell className="font-medium">{produto.nome}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline">{produto.vendido ? 'Vendido' : 'Estoque'}</Badge>
                          </TableCell>
                          <TableCell className="text-center">{formatPrice(produto.preco)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      Array.from({ length: 50 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell><Skeleton className="w-4 h-4"></Skeleton></TableCell>
                          <TableCell><Skeleton className="w-28 h-4"></Skeleton></TableCell>
                          <TableCell><Skeleton className="w-16 h-4 m-auto"></Skeleton></TableCell>
                          <TableCell><Skeleton className="w-8 h-4 m-auto"></Skeleton></TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Estoque */}
          <TabsContent value="estoque">
            <Card>
              <CardHeader>
                <CardTitle>Produtos em Estoque</CardTitle>
                <CardDescription>
                  Gerencie os preços e as informações dos produtos.
                </CardDescription>
              </CardHeader>

              <CardContent className="tabela overflow-y-auto">
                <Table id="table">

                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/12">#</TableHead>
                      <TableHead className="w-2/6">Nome</TableHead>
                      <TableHead className="text-center w-2/6">Status</TableHead>
                      <TableHead className="text-center w-2/6">Preço</TableHead>
                    </TableRow>
                  </TableHeader>

                  {/* Body */}
                  <TableBody>
                    {!isLoading && !isError ? (
                      data.objeto.data.map((produto) => (
                        <TableRow key={produto.id} onClick={() => (setProdutoSelecionado(produto), setIsDialogOpen(true))}>
                          <TableCell className="font-medium">{produto.id}</TableCell>
                          <TableCell className="font-medium">{produto.nome}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline">{produto.vendido ? 'Vendido' : 'Estoque'}</Badge>
                          </TableCell>
                          <TableCell className="text-center">{formatPrice(produto.preco)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      Array.from({ length: 50 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell><Skeleton className="w-4 h-4"></Skeleton></TableCell>
                          <TableCell><Skeleton className="w-28 h-4"></Skeleton></TableCell>
                          <TableCell><Skeleton className="w-16 h-4 m-auto"></Skeleton></TableCell>
                          <TableCell><Skeleton className="w-8 h-4 m-auto"></Skeleton></TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>

                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vendido */}
          <TabsContent value="vendido">
            <Card>
              <CardHeader>
                <CardTitle>Produtos Vendidos</CardTitle>
                <CardDescription>
                  Gerencie os preços e as informações dos produtos.
                </CardDescription>
              </CardHeader>

              <CardContent className="tabela overflow-y-auto">
                <Table id="table">

                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/12">#</TableHead>
                      <TableHead className="w-2/6">Nome</TableHead>
                      <TableHead className="text-center w-2/6">Status</TableHead>
                      <TableHead className="text-center w-2/6">Preço</TableHead>
                    </TableRow>
                  </TableHeader>

                  {/* Body */}
                  <TableBody>
                    {!isLoading && !isError ? (
                      data.objeto.data.map((produto) => (
                        <TableRow key={produto.id} onClick={() => (setProdutoSelecionado(produto), setIsDialogOpen(true))}>
                          <TableCell className="font-medium">{produto.id}</TableCell>
                          <TableCell className="font-medium">{produto.nome}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline">{produto.vendido ? 'Vendido' : 'Estoque'}</Badge>
                          </TableCell>
                          <TableCell className="text-center">{formatPrice(produto.preco)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      Array.from({ length: 50 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell><Skeleton className="w-4 h-4"></Skeleton></TableCell>
                          <TableCell><Skeleton className="w-28 h-4"></Skeleton></TableCell>
                          <TableCell><Skeleton className="w-16 h-4 m-auto"></Skeleton></TableCell>
                          <TableCell><Skeleton className="w-8 h-4 m-auto"></Skeleton></TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>

        {/* Pagination */}
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => (setCurrentPage(1))} />
            </PaginationItem>
            {currentPage - 1 > 0 &&
              <PaginationItem>
                <PaginationLink href="#" onClick={() => (setCurrentPage(currentPage - 1))}>{currentPage - 1}</PaginationLink>
              </PaginationItem>
            }
            <PaginationItem>
              <PaginationLink href="#" isActive>
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            {currentPage + 1 <= lastPage &&
              <PaginationItem>
                <PaginationLink href="#" onClick={() => (setCurrentPage(currentPage + 1))}>{currentPage + 1}</PaginationLink>
              </PaginationItem>
            }
            <PaginationItem>
              <Input
                className="w-12 text-center"
                name='inputPage'
                type="number"
                ref={inputPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value, 10);
                  if (!isNaN(page) && page >= 1 && page <= lastPage) {
                    setCurrentPage(page);
                  }
                }}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" onClick={() => (setCurrentPage(lastPage))} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <>
          <Dialog open={isDialogOpen} onOpenChange={(e) => {
            setIsDialogOpen(e)
            setNovoNome(produtoSelecionado?.nome)
            setNovoPreco(produtoSelecionado?.preco)
          }}>
            <DialogContent>
              <form onSubmit={submit}>
                <DialogHeader>
                  <DialogTitle>{produtoSelecionado?.nome}</DialogTitle>
                  <DialogDescription>
                    Edite o nome e o preço do produto
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center">
                    <Label htmlFor='nome'>Nome</Label>
                    <Input
                      id='nome'
                      maxLength={38}
                      placeholder='Produto'
                      value={produtoSelecionado?.nome || ''}
                      onChange={(e) => { handleNomeChange(e, setNovoNome); setProdutoSelecionado({ ...produtoSelecionado, nome: e.target.value }) }}
                      disabled={loadingPost}
                      required
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <Label htmlFor='preco'>Preço</Label>
                    <FormattedPriceInput
                      id='preco'
                      placeholder='0,00'
                      value={produtoSelecionado?.preco || ''}
                      onChange={((e) => { setProdutoSelecionado({ ...produtoSelecionado, preco: e.target.value }); }, setNovoPreco)}
                      maxLength={10}
                      disabled={loadingPost}
                      customInput={Input}
                      required
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    <LoaderCircle className={loadingPost ? "mr-2 h-4 w-4 animate-spin" : "hidden"} />
                    {loadingPost ? "Carregando..." : "Salvar"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </>

      </main>
    </MenuNavigation >
  </>
}