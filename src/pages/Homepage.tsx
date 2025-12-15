import { useEffect, useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Productcard from "../components/Productcard";
import type { Item } from "../lib/types";
import { Link } from "react-router";

const Homepage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/products");
        setItems(response.data.products);
        console.log(response.data);
      } catch (error) {
        console.log("Failed to get Items:", error);
        toast.error("Failed to get products!");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <div className="flex justify-center mt-10 mb-20 font-semibold text-3xl text-primary">
        <h1>Current Products!</h1>
      </div>
      {/*Webpage Loading*/}
      {loading && (
        <div className="flex flex-col items-center justify-center pt-10">
          <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
          <span className="skeleton skeleton-text text-2xl mt-20">
            Loading... Please Wait!
          </span>
        </div>
      )}
      {/*Webpage normal display after load*/}
      {!loading && items.length > 0 && (
        <div className="min-h-screen flex justify-center px-4">
          <div className=" grid gap-6 w-full max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
            {" "}
            {items.map((item) => (
              <Productcard item={item} key={item._id} />
            ))}
          </div>
        </div>
      )}
      {/*Nothing to display*/}
      {!loading && items.length === 0 && (
        <div className="flex flex-col items-center justify-center pt-10">
          <h2 className="text-xl text-error pb-10">No Products Found!</h2>
          <div className="skeleton h-32 w-32"></div>
          <Link to={"/create"}>
            <h3 className="pt-5 text-primary hover:underline">
              Create A Product.
            </h3>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Homepage;
