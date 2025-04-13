import { useCartStore } from "@/stores/cart.store";

const Summary = () => {
    const { items } = useCartStore();
    return (
        <div className="md:col-span-2 border border-gray-400 rounded-md p-4 h-fit">
            <h2 className="text-lg font-bold">Order Summary</h2>
            <h3 className="text-md text-gray-500 mt-2" data-testid="sumary-item-count">{items.length} items</h3>
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
                <span>${items.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</span>
            </div>
            <button className="bg-secondary text-white px-4 py-2 rounded-md w-full">Checkout</button>
        </div>
    )
}

export { Summary }