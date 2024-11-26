import React, { useRef, useState, useEffect } from "react"
import MenuNavigation from "./MenuNavigation"
import { handleInputChange } from "@/utils/utils"


export function HomePage() {

  const inputSearch = useRef(null)
  const [nomeFiltro, setNomeFiltro] = useState("")

  return <>
    <MenuNavigation onSearch={(e) => (handleInputChange(e, setNomeFiltro))} ref={inputSearch}>
      <>Aqui está a home page</>
    </MenuNavigation >
  </>
}