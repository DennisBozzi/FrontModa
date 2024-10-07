import { format, parseISO } from 'date-fns';
import ellipsis from 'text-ellipsis';


export const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)
}

export const handleNomeChange = (e, setNovoNome) => {
  const value = e.target.value.replace(/[^a-zA-Z0-9\s\u00C0-\u00FF]/g, '');
  setNovoNome(value);
}

export const handlePrecoChange = (e, setNovoPreco) => {
  const value = e.target.value.replace(/[^0-9,]/g, '');
  setNovoPreco(value);
}

export const handleInputChange = (e, setNomeFiltro) => {
  setNomeFiltro(e);
};

export const formatDate = (date) => {
  return format(parseISO(date), 'dd/MM/yyyy');
}

export const formatProducts = (produtos, isSmallScreen) => {
  var nomes = produtos.map(produto => produto.nome).join(", ");
  return isSmallScreen ? ellipsis(nomes, 28) : nomes;
}