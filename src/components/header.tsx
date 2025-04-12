import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";
export default function Header() {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-100 font-areaNormal">
          <Link href="/" className="text-xl " data-testid="header-link">GamerShop</Link>
          <Link href="/cart" data-testid="cart-link" aria-label="Cart"><ShoppingCartIcon /></Link>
        </header>
    )
}