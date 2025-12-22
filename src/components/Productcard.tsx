import { SquarePen, Trash2 } from "lucide-react";
import type { Item } from "../lib/types";
import DeleteModal from "./Deletemodal";
import UpdateModal from "./Updatemodal";

interface ProductCardProps {
  item: Item;
  onDeleted?: (id: string) => void;
  onUpdated?: (updatedItem: Item) => void;
}

const Productcard = ({ item, onDeleted, onUpdated }: ProductCardProps) => {
  const deleteModalId = `delete_modal_${item._id}`;
  const updateModalId = `update_modal_${item._id}`;

  const editModal = () => {
    (document.getElementById(updateModalId) as HTMLDialogElement)?.showModal();
  };

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
            <button className="btn btn-ghost text-primary" onClick={editModal}>
              <SquarePen />
            </button>
            <button
              className="btn btn-ghost text-error"
              onClick={() =>
                (
                  document.getElementById(deleteModalId) as HTMLDialogElement
                )?.showModal()
              }
            >
              <Trash2 />
            </button>
          </div>
        </div>
      </div>     
      <DeleteModal item={item} modalId={deleteModalId} onDeleted={onDeleted} />
      <UpdateModal item={item} modalId={updateModalId} onUpdated={onUpdated} />
    </div>
  );
};

export default Productcard;
