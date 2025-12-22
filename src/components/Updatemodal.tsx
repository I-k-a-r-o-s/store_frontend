import { useState } from "react";
import type { Item } from "../lib/types";
import api from "../lib/axios";
import toast from "react-hot-toast";

interface UpdateModalProps {
  item: Item;
  modalId: string;
  onUpdated?: (updatedItem: Item) => void;
}

const Updatemodal = ({ item, modalId, onUpdated }: UpdateModalProps) => {
  const [name, setName] = useState(item.name);
  const [image, setImage] = useState(item.image);
  const [price, setPrice] = useState(String(item.price));

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
      (document.getElementById(modalId) as HTMLDialogElement)?.close();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-5">Edit Product</h3>
        <div className="space-y-4">
          <label className="floating-label">
            <input
              type="text"
              placeholder="Name"
              className="input input-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span>Name</span>
          </label>
          <label className="floating-label">
            <input
              type="number"
              placeholder="Price"
              className="input input-lg"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span>Price</span>
          </label>
          <label className="floating-label">
            <input
              type="text"
              placeholder="Image"
              className="input input-lg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <span>Image</span>
          </label>
        </div>
        <div className="modal-action">
          <form method="dialog" className="flex gap-3">
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Updatemodal;
