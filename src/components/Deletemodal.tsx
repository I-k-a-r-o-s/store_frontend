import type { Item } from "../lib/types";
import api from "../lib/axios";
import toast from "react-hot-toast";

interface DeleteModalProps {
  item: Item;
  modalId: string;
  onDeleted?: (id: string) => void;
}

const Deletemodal = ({ item, modalId, onDeleted }: DeleteModalProps) => {
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

  return (
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete Product?</h3>
        <p className="py-4">
          Are you sure you want to remove <b>{item.name}</b>? This action cannot
          be undone.
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
  );
};

export default Deletemodal;
