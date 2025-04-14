import { useCartStore } from "@/stores/cart.store";
import { useModal } from "@/stores/modal.store";
import { useRouter } from "next/navigation";
const Summary = () => {
  const { items, clearCart, getTotal } = useCartStore();
  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const handleCheckout = () => {
    openModal(
      <div className="flex flex-col gap-4 items-center justify-center">
        <div>Thanks for your order</div>
        <button
          className="bg-secondary text-white px-4 py-2 rounded-md mt-5"
          onClick={() => {
            clearCart();
            router.push("/");
            closeModal();
          }}
        >
          Accept
        </button>
      </div>
    );
  };
  if (items.length === 0) return null;
  return (
    <div className="md:col-span-2 border border-gray-400 rounded-md p-4 h-fit">
      <h2 className="text-lg font-bold">Order Summary</h2>
      <h3
        className="text-md text-gray-500 mt-2"
        data-testid="sumary-item-count"
      >
        {items.length} items
      </h3>
      <ul className="flex flex-col gap-3 my-6">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.name}</span>
            <span className="ml-5">${item.price}</span>
          </li>
        ))}
      </ul>
      <hr className="my-4" />
      <div className="flex justify-between my-4 font-bold text-primary">
        <span>Order total</span>
        <span>${getTotal().toFixed(2)}</span>
      </div>
      {items.length > 0 && (
        <button
          className="bg-secondary text-white px-4 py-2 rounded-md w-full"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      )}
    </div>
  );
};

export { Summary };
