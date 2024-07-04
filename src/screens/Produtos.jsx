import React from "react";
import { MenuNavigation } from "./MenuNavigation";
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function Produtos() {
  return <>
    <MenuNavigation>
      <main className=" items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="flex place-content-between">
          <Tabs defaultValue="todos">
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="ativos">Ativos</TabsTrigger>
              <TabsTrigger value="vendidos">Vendidos</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button size="sm" className="h-7 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Novo Produto
            </span>
          </Button>
        </div>
      </main>
    </MenuNavigation>
  </>
}