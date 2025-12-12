import { useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/axios";

interface ItemDetails {
  name: string;
  price: string;
  image: string;
}

const Createpage = () => {
  const [itemDetails, setItemDetails] = useState<ItemDetails>({
    name: "",
    price: "",
    image: "",
  });

  const handleErase = () => {
    if (
      itemDetails.name.length > 0 ||
      itemDetails.price.length > 0 ||
      itemDetails.image.length > 0
    ) {
      setItemDetails({
        name: "",
        price: "",
        image: "",
      });
      toast.success("Form cleared successfully");
    } else {
      toast.error("Form is already empty");
    }
  };

  const handleAddItem = async (e: any) => {
    e.preventDefault();
    try {
      if (
        !itemDetails.name.trim() ||
        !itemDetails.price.trim() ||
        !itemDetails.image.trim()
      ) {
        toast.error("Please fill all the fields");
        return;
      }
      await api.post("/", itemDetails);
      toast.success("Product created successfully");
      setItemDetails({
        name: "",
        price: "",
        image: "",
      });
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error");
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-10 mb-20 font-semibold text-3xl text-primary">
        <h1>Create a Product!</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="card bg-base-200 w-full max-w-xl">
          <div className="card-body text-left">
            <div className="flex flex-col w-full items-stretch gap-4">
              <label className="floating-label relative w-full block">
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-lg w-full"
                  name="name"
                  value={itemDetails.name}
                  onChange={(e) =>
                    setItemDetails({ ...itemDetails, name: e.target.value })
                  }
                />
                <span className="pointer-events-none">Name</span>
              </label>

              <label className="floating-label relative w-full block">
                <input
                  type="text"
                  placeholder="Price"
                  className="input input-lg w-full"
                  name="price"
                  value={itemDetails.price}
                  onChange={(e) =>
                    setItemDetails({ ...itemDetails, price: e.target.value })
                  }
                />
                <span className="pointer-events-none">Price</span>
              </label>

              <label className="floating-label relative w-full block">
                <input
                  type="text"
                  placeholder="Image URL"
                  className="input input-lg w-full"
                  name="image"
                  value={itemDetails.image}
                  onChange={(e) =>
                    setItemDetails({
                      ...itemDetails,
                      image: e.target.value,
                    })
                  }
                />
                <span className="pointer-events-none">Image URL</span>
              </label>
            </div>

            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary" onClick={handleAddItem}>
                Accept
              </button>
              <button className="btn btn-ghost btn-error" onClick={handleErase}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Createpage;
