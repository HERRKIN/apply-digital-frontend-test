"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/stores/cart.store";
import { Summary } from "./components/sumary";
import { CartList } from "./components/cart-list";
import { Modal } from "@/components/modal";
const Cart = () => {
  const { items } = useCartStore();

  return (
    <div className="p-6 flex flex-1 flex-col lg:max-w-[1172px] lg:mx-auto w-full">
      <Link href="/" className="flex items-center gap-2 text-md text-secondary">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to catalog</span>
      </Link>
      <h1 className="text-2xl font-bold mt-10">Your Cart</h1>
      <h2 className="text-xl text-gray-500 mt-2" data-testid="cart-item-count">{items.length} items</h2>
      <div className="grid grid-cols-1  md:grid-cols-5 gap-10 mt-20 ">
        <CartList />
        <Summary />
        <Modal />
      </div> 
    </div>
  );
};

export default Cart;
