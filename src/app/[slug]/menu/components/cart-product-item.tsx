import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext, CartProduct } from "../contexts/cart";

interface CartItemProps {
  product: CartProduct;
}

const CartProductItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity, removeProduct } =
    useContext(CartContext);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-gray-100">
          <Image
            className="m-auto p-1"
            src={product.imageUrl}
            alt={product.name}
            fill
          />
        </div>
        <div className="space-y-1">
          <p className="max-w-[70%] truncate text-ellipsis text-xs sm:max-w-[90%] md:max-w-[100%] md:text-sm lg:text-base">
            {product.name}
          </p>
          <p className="text-sm font-semibold lg:text-base">
            {formatCurrency(product.price)}
          </p>
          {/* QUANTIDADE */}
          <div className="flex items-center gap-1 text-center">
            <Button
              className="h-7 w-7 rounded-lg lg:h-10 lg:w-10"
              variant="outline"
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-7 text-xs md:text-sm lg:text-base">
              {product.quantity}
            </p>
            <Button
              className="h-7 w-7 rounded-lg lg:h-10 lg:w-10"
              variant="destructive"
              onClick={() => increaseProductQuantity(product.id)}
            >
              <ChevronRightIcon />
            </Button>
            <Button
              className="h-7 w-7 rounded-lg sm:ml-5 lg:h-10 lg:w-10"
              variant="outline"
              onClick={() => removeProduct(product.id)}
            >
              <TrashIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductItem;
