import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";
export default function Header() {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-100 font-areaNormal">
          <Link href="/" className="text-xl ">GamerShop</Link>
          <Link href="/cart"><ShoppingCartIcon /></Link>
        </header>
    )
}