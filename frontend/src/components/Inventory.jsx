import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { FaEdit, FaSave, FaPlus } from "react-icons/fa";
import moment from "moment";

function Inventory() {
  
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ id: "", name: "", quantity: "" });
  const [editQuantity, setEditQuantity] = useState({});
  const [error, setError] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const token = localStorage.getItem("jwt");

  const fetchProducts = useCallback(async () => {
    try {
      const { data, status } = await axios.get(`http://localhost:8080/api/stock`, {
        headers: { Authorization: `Bearer ${token}` },
        validateStatus: () => true,
      });

      if (status === 200) {
        const mappedData = data.map(item => ({
          invid: item?.id,
          id: item?.product?.id || "N/A",
          name: item?.product?.name || "Unknown",
          price: item?.product?.price || 0,
          brand: item?.product?.brand?.name || "No Brand",
          quantity: item?.quantity || 0,
          updated: item?.lastUpdated ? moment(item.lastUpdated).format("L") : "Not Available",
        }));
        setProducts(mappedData);
        setFilteredProducts(mappedData);
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearchChange = (value) => {
    setSearchValue(value);
    const filtered = value
      ? products.filter(
          product =>
            product.id.toString().includes(value) ||
            product.name.toLowerCase().includes(value.toLowerCase())
        )
      : products;
    setFilteredProducts(filtered);
  };

  const handleAddNewProduct = async () => {
    const { id, quantity, name } = newProduct;
    if (!id || !quantity || isNaN(quantity) || quantity < 0 || quantity > 300) {
      setError("Invalid Product Id or Quantity");
      return;
    }
    try {
      const { status } = await axios.post(
        "http://localhost:8080/api/stock",
        {
          product: { id, name },
          quantity: Number(quantity),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (status === 200) {
        fetchProducts();
        setNewProduct({ id: "", name: "", quantity: "" });
        setError("");
      }
    } catch (error) {
      console.error("Error adding new product", error);
      setError("Error adding new product.");
    }
  };

  const handleEditClick = (productId, quantity) => {
    setEditProductId(productId);
    setEditQuantity({ ...editQuantity, [productId]: quantity });
  };

  const handleSaveClick = async (productId) => {
    const updatedQuantity = editQuantity[productId];
    if (isNaN(updatedQuantity) || updatedQuantity < 0 || updatedQuantity > 300) {
      setError("Quantity must be a number between 0 and 300.");
      return;
    }
    try {
      const { status } = await axios.put(
        `http://localhost:8080/api/stock/${productId}`,
        { quantity: updatedQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (status === 200) {
        fetchProducts();
        setEditProductId(null);
        setEditQuantity({});
        setError("");
      }
    } catch (error) {
      console.error("Error updating product quantity", error);
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}

        <div className="row border p-3 mb-4 align-items-center">

          <div className="col-md-1 text-end">
            <div className="fs-5 badge text-dark">Search:</div>
          </div>

          <div className="col-md-3">
            <input
              type="text"
              placeholder="Search by Product Id or Name"
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="form-control"
            />
          </div>
        
          <div className=" col-md-2 text-end">
            <div className="fs-5 text-dark badge">Add Stock:</div>
          </div>

          <div className="col-md-2">
            <input
              type="text"
              placeholder="Product Id"
              value={newProduct.id}
              onChange={(e) => setNewProduct({ ...newProduct, id: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              placeholder="Quantity"
              min="0"
              max="300"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-success" onClick={handleAddNewProduct}>
              <FaPlus /> Add Product
            </button>
          </div>

      </div>

      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center ">
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Unit Price</th>
            <th>Stock</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredProducts
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.price}</td>
                <td>
                  {editProductId === product.id ? (
                    <input
                      type="number"
                      min="0"
                      max="300"
                      value={editQuantity[product.id] || ""}
                      onChange={(e) =>
                        setEditQuantity({ ...editQuantity, [product.id]: e.target.value })
                      }
                      className="form-control"
                    />
                  ) : (
                    product.quantity
                  )}
                </td>
                <td>{product.updated}</td>
                <td>
                  {editProductId === product.id ? (
                    <button className="btn btn-success" onClick={() => handleSaveClick(product.id)}>
                      <FaSave /> Save
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={() => handleEditClick(product.id, product.quantity)}>
                      <FaEdit /> Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
