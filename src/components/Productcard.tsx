import { SquarePen, Trash2 } from "lucide-react";
import type { Item } from "../lib/types";
import api from "../lib/axios";
import toast from "react-hot-toast";

interface ProductCardProps {
  item: Item;
  setItem: React.Dispatch<React.SetStateAction<Item[]>>;
}

const Productcard = ({ item, setItem }: ProductCardProps) => {
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      await api.delete(`/products/${id}`);
      setItem((prev) => prev.filter((item) => item._id !== id));
      toast.success("Product Removed!");
    } catch (error) {
      console.log("Failed to remove item:", error);
      toast.error("Failed to Remove Product!");
    }
  };
  return (
    <div className="card bg-base-100 shadow-sm w-full max-w-sm">
      <figure>
        <img
          src={item.image}
          alt={item.name}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl">{item.name}</h2>
        <h3 className="mt-2 font-semibold text-lg">${item.price}</h3>
        <div className="text-sm text-gray-500">
          <p>
            Added to inventory at:{" "}
            {item.createdAt ? new Date(item.createdAt).toLocaleString() : "N/A"}
          </p>
          <p>
            Updated at:{" "}
            {item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "N/A"}
          </p>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-ghost text-primary">
            <SquarePen />
          </button>
          <button
            className="btn btn-ghost text-error"
            onClick={() => handleDelete(item._id)}
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Productcard;
