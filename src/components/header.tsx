"use client"
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";
import { useCartStore } from "../stores/cart.store";
export default function Header() {
  const cartStore = useCartStore();
    return (
        <header className="flex justify-between items-center p-4 bg-gray-100 font-areaNormal">
          <Link href="/" className="text-xl " data-testid="header-link">GamerShop</Link>
          <Link href="/cart" data-testid="cart-link" aria-label="Cart" className="relative"><ShoppingCartIcon />
          {cartStore.items.length > 0 && <span className="text-sm font-bold absolute top-[-5px] right-[-5px] bg-secondary text-white rounded-full max-h-4 flex items-center justify-center p-2">{cartStore.items.length}</span>}  
          </Link>
        </header>
    )
}