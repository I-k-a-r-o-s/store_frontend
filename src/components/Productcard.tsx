import { SquarePen, Trash2 } from "lucide-react";
import type { Item } from "../lib/types";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";

interface ProductCardProps {
  item: Item;
  onDeleted?: (id: string) => void;
  onUpdated?: (updatedItem: Item) => void;
}

const Productcard = ({ item, onDeleted, onUpdated }: ProductCardProps) => {
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

  const deleteModalId = `delete_modal_${item._id}`;
  const updateModalId = `update_moadl_${item._id}`;

  const [name, setName] = useState(item.name);
  const [image, setImage] = useState(item.image);
  const [price, setPrice] = useState(String(item.price));

  const editModal = () => {
    setName(item.name);
    setPrice(String(item.price));
    setImage(item.image);
    (document.getElementById(updateModalId) as HTMLDialogElement)?.showModal();
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.patch(`/products/${item._id}`, {
        name,
        price: Number(price),
        image,
      });

      const updatedProduct = res.data.product;

      onUpdated?.(updatedProduct);
      toast.success("Product updated");

      (document.getElementById(updateModalId) as HTMLDialogElement)?.close();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div>
      {/*Card*/}
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

      {/*Delete confirmation*/}
      <dialog id={deleteModalId} className="modal modal-bottom sm:modal-middle">
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

      {/*Update confirmation*/}
      <dialog id={updateModalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">Edit Product</h3>
          <div className="space-y-4">
            <label className="floating-label">
              <input
                type="text"
                placeholder="Name"
                className="input input-lg"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <span>Name</span>
            </label>
            <label className="floating-label">
              <input
                type="number"
                placeholder="Price"
                className="input input-lg"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <span>Price</span>
            </label>
            <label className="floating-label">
              <input
                type="text"
                placeholder="Image"
                className="input input-lg"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              />
              <span>Image</span>
            </label>
          </div>
          <div className="modal-action ">
            <form method="dialog" className="flex gap-2">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default Productcard;
