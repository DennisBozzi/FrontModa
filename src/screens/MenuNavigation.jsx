import React from 'react';
import blackLeaf from '../assets/blackLeaf.png'
import { Link, useLocation } from 'react-router-dom';
import {
  File,
  ShoppingBasket,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function MenuNavigation({ children }) {
  const location = useLocation();
  const pathname = location.pathname;
  const marcado = 'flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8';
  const naoMarcado = 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8';
  const isMarcado = (path) => pathname === path ? marcado : naoMarcado;


  return <div className="flex h-lvh">
    <aside className=" h-100 inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">

        <Link to='/Home' className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
          <img src={blackLeaf} className='w-12' />
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
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Vendas</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Vendas</TooltipContent>
        </Tooltip>

      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="#" className={naoMarcado}>
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>

    
    {children}

  </div>
}