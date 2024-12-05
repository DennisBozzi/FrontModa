import React, { useEffect, useState, useRef } from "react"
import MenuNavigation from "./MenuNavigation"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useProdutoDelete } from "@/hooks/useProdutoDelete"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProdutoMutate } from "@/hooks/useProdutoMutate"
import { LoaderCircle } from 'lucide-react'
import { showSuccessToast, showDefaultToast } from '@/components/ui/showToast'
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import FormattedPriceInput from "@/components/ui/price-input"
import { formatPrice, handleInputChange, formatDate, formatProducts } from "@/utils/utils"
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
import { useVendasData } from "@/hooks/useVendasData"
import { useMediaQuery } from 'react-responsive';
import { useVendaDelete } from "@/hooks/useVendaDelete"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function Vendas() {

  const [vendaSelecionada, setVendaSelecionada] = useState(null)
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showPagination, setShowPagination] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [nomeFiltro, setNomeFiltro] = useState("")
  const inputPage = useRef(null)
  const inputSearch = useRef(null)
  const { toast } = useToast()

  const { data, isLoading: isLoadingVendas, isError } = useVendasData(currentPage, nomeFiltro)
  const { mutate: deleteProduto, isSuccess: isSuccessDelete, isPending: isLoadingDelete } = useProdutoDelete()
  const { mutate: deleteVenda, isSuccess: isSuccessDeleteVenda, isPending: isLoadingDeleteVenda } = useVendaDelete()
  const isSmallScreen = useMediaQuery({ query: '(max-width: 1050px)' });

  //Apagar o produto da lista de Venda
  const submitDeleteProduto = async (e, produto) => {
    e.preventDefault()
    deleteProduto(produto.id)
    setProdutoSelecionado(produto)
  };

  //Apagar a venda
  const submitDeleteVenda = async (e, venda) => {
    e.preventDefault()
    deleteVenda(venda.id)
    setVendaSelecionada(venda)
  };

  useEffect(() => {
    if (isSuccessDelete && !isLoadingDelete) {
      //Removendo o produto da lista após a exclusão
      vendaSelecionada.produtos = vendaSelecionada.produtos.filter((produto) => produto.id !== produtoSelecionado.id)
      toast(showDefaultToast('Produto excluído com sucesso!'));
      //Fechando o modal, caso ao apague o último produto
      if (vendaSelecionada.produtos.length === 0)
        setIsDialogOpen(false)
    }
  }, [isSuccessDelete]);


  useEffect(() => {
    if (isSuccessDeleteVenda && !isLoadingDeleteVenda) {
      toast(showDefaultToast('Venda excluída com sucesso!'));
      setIsDialogOpen(false)
    }
  }, [isSuccessDeleteVenda]);

  useEffect(() => { setCurrentPage(1); if (!isLoadingVendas) { setLastPage(data.objeto.pageTotal) } }, [nomeFiltro]);
  useEffect(() => { if (!isLoadingVendas) { setLastPage(data.objeto.pageTotal) } }, [isLoadingVendas]);

  return <>
    <MenuNavigation onSearch={(e) => (handleInputChange(e, setNomeFiltro))} ref={inputSearch}>
      <main className="items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="vendas">
          <div className="flex place-content-between">
            
            <TabsList className='w-full justify-between bg-transparent p-0'>
              <div className="bg-secondary rounded-lg p-1">
                <TabsTrigger onMouseDown={() => setShowPagination(true)} value="vendas">Vendas</TabsTrigger>
              </div>
            </TabsList>
          </div>

          {/* Vendas */}
          <TabsContent value="vendas">
            <Card>
              <CardHeader>
                <CardTitle>Todas as Vendas</CardTitle>
                <CardDescription>
                  Gerencie e crie novas vendas.
                </CardDescription>
              </CardHeader>
              <CardContent className="tabela overflow-y-auto">
                <Table id="table">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-1/12">#</TableHead>
                      <TableHead className="w-2/6 hidden md:table-cell">Produtos</TableHead>
                      <TableHead className="text-center w-1/6">Vendido</TableHead>
                      <TableHead className="hidden text-center w-1/6 md:table-cell">Itens</TableHead>
                      <TableHead className="text-center w-1/12">Desconto</TableHead>
                      <TableHead className="text-center w-1/6">Total</TableHead>
                    </TableRow>
                  </TableHeader>

                  {/* Body */}
                  <TableBody>
                    {!isLoadingVendas && !isError ? (
                      data.objeto.data.map((venda) => (
                        <TableRow className="cursor-pointer" key={venda.id} onClick={() => (setVendaSelecionada(venda), setIsDialogOpen(true))}>
                          <TableCell className="font-medium">{venda.id}</TableCell>
                          <TableCell className="font-medium hidden md:table-cell">{formatProducts(venda.produtos, isSmallScreen)}</TableCell>
                          <TableCell className="text-center">{formatDate(venda.vendidoEm)}</TableCell>
                          <TableCell className="hidden md:table-cell text-center">{venda.produtos.length}</TableCell>
                          <TableCell className="text-center">{formatPrice(venda.desconto)}</TableCell>
                          <TableCell className="text-center">{formatPrice(venda.valorTotal)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      Array.from({ length: 50 }).map((_, index) => (
                        <TableRow key={index}>
                          <TableCell><Skeleton className="w-4 h-4"></Skeleton></TableCell>
                          <TableCell><Skeleton className="w-28 h-4"></Skeleton></TableCell>
                          <TableCell><Skeleton className="w-16 h-4 m-auto"></Skeleton></TableCell>
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
        <Pagination className={`sm:mt-4 mt-2 ${showPagination ? '' : 'hidden'}`}>
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

        {/* Dialog visualização da Venda  */}
        {/* TODO: Implementar scroll na tabela de produtos */}
        <>
          <Dialog open={isDialogOpen} onOpenChange={(e) => { setIsDialogOpen(e) }}>
            <DialogContent>

              <DialogHeader>
                <DialogTitle>Venda</DialogTitle>
                <DialogDescription>
                  Venda realizada no dia {formatDate(vendaSelecionada?.vendidoEm)}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4 h-96 overflow-y-auto">
                <Table id="tableVenda">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-2/6 text-center">Nome</TableHead>
                      <TableHead className="w-2/6 text-center">Valor</TableHead>
                      <TableHead className="w-2/6 text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className='overflow-scroll'>
                    {vendaSelecionada?.produtos ? (
                      vendaSelecionada.produtos.map((produto) => (
                        <TableRow key={produto.id}>
                          <TableCell className="text-center">{produto.nome}</TableCell>
                          <TableCell className="text-center">{formatPrice(produto.preco)}</TableCell>
                          <TableCell className="text-center">
                            <Button disabled={isLoadingDelete || isLoadingDeleteVenda}
                              variant="destructive" onClick={(e) => submitDeleteProduto(e, produto)}>
                              Excluir
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan="3" className="text-center">No products available</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                <div className="grid grid-cols-4 items-center">
                  <Label htmlFor='preco' className="text-center">Desconto</Label>
                  <FormattedPriceInput value={vendaSelecionada?.desconto || '0,00'} disabled customInput={Input} className="col-span-1" />
                  <Label htmlFor='preco' className="text-center">Valor Total</Label>
                  <FormattedPriceInput value={vendaSelecionada?.valorTotal || '0,00'} disabled customInput={Input} className="col-span-1" />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" disabled={isLoadingDelete || isLoadingDeleteVenda} className="text-black dark:text-white sm:mt-0 mt-2" variant="secondary" onClick={(e) => { submitDeleteVenda(e, vendaSelecionada) }}>
                  <LoaderCircle className={isLoadingDeleteVenda ? "mr-2 h-4 w-4 animate-spin" : "hidden"} />
                  {isLoadingDeleteVenda ? "Carregando..." : "Excluir"}
                </Button>
                <Button type="submit" variant="secondary" disabled={isLoadingDelete || isLoadingDeleteVenda} onClick={() => setIsDialogOpen(false)}>
                  Fechar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>

      </main>
    </MenuNavigation >
  </>
}