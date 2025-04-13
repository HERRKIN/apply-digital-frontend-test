import { useCartStore } from "@/stores/cart.store";
import { Game } from "@/utils/endpoint";
import { X } from "lucide-react";
const CartList = () => {
  const { items } = useCartStore();
  return (
    <div className="md:col-span-3 flex flex-col gap-10 xl:col-span-7 ">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

const CartItem = ({ item }: { item: Game }) => {
  const { removeItem } = useCartStore();
  return (
    <div
      key={item.id}
      className="flex flex-col sm:flex-row gap-4 border-b border-secondary last:border-none  relative pb-6"
    >
      <div className="md:max-w-[256px] object-cover max-w-[80%] relative">
        <img src={item.image} alt={item.name} />
        {item.isNew &&  <span className="text-sm text-gray-500 absolute top-2 left-2  bg-stone-100 rounded-md px-2 py-1">New</span>}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500 uppercase font-bold font-archivio">{item.genre}</span>
        <h3 className="text-xl font-bold">{item.name}</h3>
        <span className="text-lg md:text-base text-gray-500">{item.description}</span>
      </div>
      <span className=" text-right sm:absolute sm:bottom-6 sm:right-16  text-xl font-bold text-primary">${item.price}</span>
      <button className="absolute top-0 right-0" onClick={() => removeItem(item.id)}  data-testid="remove-item">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export { CartList, CartItem };
