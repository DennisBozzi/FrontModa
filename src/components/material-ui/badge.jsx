import * as React from 'react';
import { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import { Badge as BadgeShad } from '@/components/ui/badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useCart } from '@/components/contexts/cartContext';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { formatPrice } from '@/utils/utils';
import { Input } from "@/components/ui/input";
import FormattedPriceInput from "@/components/ui/price-input"
import { useVendaMutate } from '@/hooks/useVendaMutate';

function CartBadge() {
  const { mutate: postVenda, isSuccess: isSuccessVenda, isPending: isLoadingVenda } = useVendaMutate()
  const { cart, removeFromCart, clearCart } = useCart();
  const [desconto, setDesconto] = useState('');
  const cartLength = cart.length;

  const concluirVenda = async (e) => {
    e.preventDefault();
    var cartIds = cart.map(product => product.id)
    var sendDesconto = parseFloat(desconto != '' ? desconto.replace(",", ".") : 0)
    postVenda({ produtos: cartIds, desconto: sendDesconto })
  }

  useEffect(() => {
    if (isSuccessVenda) {
      clearCart()
      setDesconto('')
    }
  }, [isSuccessVenda]);

  return (
    <Sheet>
      <SheetTrigger>
        <Badge badgeContent={cartLength} color="primary" className='cursor-pointer'>
          <ShoppingCartIcon />
        </Badge>
      </SheetTrigger>
      <SheetContent className='flex flex-col justify-between'>
        <div>
          <SheetTitle className='flex items-center gap-2'>Carrinho</SheetTitle>
          <SheetDescription className='mb-2'>
            Todos os produtos adicionados ao carrinho
          </SheetDescription>
          {cart.map(product => (
            <div key={product.id} className='flex items-center justify-between border-b-2'>
              <div className='flex items-center gap-2'>
                <BadgeShad className='px-1 w-8 justify-center'>{product.id}</BadgeShad>
                <span>{product.nome}</span>
              </div>
              <div className='flex items-center'>
                <span>{formatPrice(product.preco)}</span>
                <Button variant='icon' size='icon' className='px-1' disabled={isLoadingVenda} onClick={() => removeFromCart(product.id)}><X width={16} /></Button>
              </div>
            </div>
          ))}
        </div>
        <div className='gap-2 flex flex-col'>

          <BadgeShad variant='outline' className='w-fit ml-auto text-sm'>
            Valor Total: {formatPrice(cart.reduce((acc, product) => acc + product.preco, 0) - parseFloat(desconto != '' ? desconto.replace(",", ".") : 0))}
          </BadgeShad>

          <div className='flex items-center gap-2'>
            Desconto: <FormattedPriceInput
              id='preco'
              placeholder='0,00'
              value={desconto}
              onChange={(e) => { e ? setDesconto(e) : setDesconto(''), console.log(desconto) }}
              maxLength={6}
              disabled={isLoadingVenda}
              customInput={Input}
              required
              className="col-span-3"
            />
          </div>
          <div className='flex gap-2'>
            <Button disabled={isLoadingVenda} variant="secondary" className='w-full' onClick={clearCart}>Limpar Carrinho</Button>
            <Button disabled={isLoadingVenda} className='w-full' onClick={(e) => concluirVenda(e)}>Concluir</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { CartBadge };