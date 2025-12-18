import { SquarePen, Trash2 } from "lucide-react";
import type { Item } from "../lib/types";
import api from "../lib/axios";
import toast from "react-hot-toast";

interface ProductCardProps {
  item: Item;
  onDeleted?: (id: string) => void;
}

const Productcard = ({ item, onDeleted }: ProductCardProps) => {
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      onDeleted?.(id);
      toast.success("Product Removed!");
    } catch (error) {
      console.log("Failed to remove item:", error);
      toast.error("Failed to Remove Product!");
    }
  };

  const modalId = `delete_modal_${item._id}`;

  return (
    <div>
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
              {item.createdAt
                ? new Date(item.createdAt).toLocaleString()
                : "N/A"}
            </p>
            <p>
              Updated at:{" "}
              {item.updatedAt
                ? new Date(item.updatedAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-ghost text-primary">
              <SquarePen />
            </button>
            <button
              className="btn btn-ghost text-error"
              onClick={() =>
                (
                  document.getElementById(modalId) as HTMLDialogElement
                )?.showModal()
              }
            >
              <Trash2 />
            </button>
          </div>
        </div>
      </div>

      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Product?</h3>
          <p className="py-4">
            Are you sure you want to remove <b>{item.name}</b>? This action
            cannot be undone.
          </p>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>

            <button
              className="btn btn-error"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default Productcard;
