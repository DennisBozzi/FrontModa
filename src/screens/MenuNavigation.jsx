import React, { forwardRef, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from '@/hooks/useAuth';
import { debounce } from 'lodash';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Leaf,
  ShoppingBasket,
  Home,
  Package,
  PanelLeft,
  Search,
  Settings,
  LogOut
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const MenuNavigation = forwardRef(({ children, onSearch }, ref) => {
  const location = useLocation();
  const pathname = location.pathname;
  const marcado = 'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8';
  const naoMarcado = 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8';
  const marcadoLeft = 'flex items-center gap-4 px-2.5 text-foreground';
  const naoMarcadoLeft = 'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground';
  const isMarcadoLeft = (path) => pathname === path ? marcadoLeft : naoMarcadoLeft;
  const isMarcado = (path) => pathname === path ? marcado : naoMarcado;
  const { logout } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const debouncedSearch = useCallback(
    debounce((query) => {
      onSearch(query);
    }, 300),
    []
  );

  const handleInputChange = (event) => {
    debouncedSearch(event.target.value);
  }

  return <div className="flex min-h-screen w-full bg-muted/40">

    <aside className="h-lvh inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">

        <Link to='/Home' className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
          <Leaf className="h-5 w-5" />
        </Link>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/Home" className={isMarcado('/Home')} >
              <Home className="h-5 w-5" />
              <span className="sr-only">Início</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Início</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/Produtos" className={isMarcado('/Produtos')}>
              <Package className="h-5 w-5" />
              <span className="sr-only">Produtos</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Produtos</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/Vendas" className={isMarcado('/Vendas')}>
              <ShoppingBasket className="h-5 w-5" />
              <span className="sr-only">Vendas</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Vendas</TooltipContent>
        </Tooltip>

      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link className={naoMarcado} onClick={() => (setIsDialogOpen(true))}>
              <Settings className="h-5 w-5" />
              <span className="sr-only">Configurações</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Configurações</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Dialog>
              <DialogTrigger asChild>
                <Link className={naoMarcado}>
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Sair</span>
                </Link>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sair</DialogTitle>
                  <DialogDescription>
                    Tem certeza que realmente deseja sair?
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button onClick={() => logout()}>
                    Sair
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>

      </nav>
    </aside>

    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        {/* Side Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="sm:max-w-xs">
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
            <nav className="grid gap-6 text-lg font-medium">
              <Link to="/Home" className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                <Leaf className="h-5 w-5 transition-all group-hover:scale-110" />
              </Link>
              <Link to="/Home" className={isMarcadoLeft('/Home')} >
                <Home className="h-5 w-5" />
                Início
              </Link>
              <Link to="/Produtos" className={isMarcadoLeft('/Produtos')}>
                <Package className="h-5 w-5" />
                Produtos
              </Link>
              <Link to="/Vendas" className={isMarcadoLeft('/Vendas')}>
                <ShoppingBasket className="h-5 w-5" />
                Vendas
              </Link>
              <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground" onClick={() => (setIsDialogOpen(true))}>
                <Settings className="h-5 w-5" />
                Configurações
              </Link>
            </nav>
          </SheetContent>

        </Sheet>

        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" id="search" onChange={handleInputChange} ref={ref} placeholder="Procurar..." className="w-full rounded-lg bg-background pl-8 md:w-[320px] lg:w-[320px]" />
        </div>

        <Button variant="icon" size="icon" className="overflow-hidden rounded-full" onClick={() => (setIsDialogOpen(true))}>
          <img src="https://avatars.githubusercontent.com/u/98779786?v=4" alt="" />
        </Button>

      </header>

      {children}

    </div>

    {/* Dialog edição do produto */}
    <Dialog open={isDialogOpen} onOpenChange={(e) => { setIsDialogOpen(e) }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Em Desenvolvimento</DialogTitle>
          <DialogDescription>😁</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  </div>
});

export default MenuNavigation;