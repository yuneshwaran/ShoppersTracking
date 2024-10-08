import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import moment from "moment";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null); 

  //new product 
  const [newProduct, setNewProduct] = useState({
    id:"",
    quantity:""
  })

  const [editQuantity, setEditQuantity] = useState({});
  const [error, setError] = useState(""); 

  // Fetch the products and their quantities
  const fetchProducts = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/stock`, {
        validateStatus: () => true,
      });

      if (result.status === 200) {
        console.log(result.data);

        const data = result.data.map((item) => ({
          invid: item?.id,
          id: item?.product?.id || "N/A",
          name: item?.product?.name || "Unknown",
          price: item?.product?.price || 0,
          brand: item?.product?.brand?.name || "No Brand",
          quantity: item?.quantity || 0,
          updated: item?.lastUpdated
            ? moment(item.lastUpdated).format("L")
            : "Not Available",
        }));

        setProducts(data);
      }
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  // Handle the edit button click
  const handleEditClick = (productId, quantity) => {
    setEditProductId(productId);
    setEditQuantity({ ...editQuantity, [productId]: quantity });
    setError(""); 
  };

  // Handle changes to the quantity input field
  const handleQuantityChange = (productId, value) => {
    setEditQuantity({ ...editQuantity, [productId]: value });
    setError(""); 
  };

  const handleSaveClick = async (productId) => {
    const updatedQuantity = editQuantity[productId];

    const quantityToSave = Number(updatedQuantity);
    if (isNaN(quantityToSave) || quantityToSave < 0 || quantityToSave > 300) {
      setError("Quantity must be a number between 0 and 300.");
      return;
    }

    try {
      const result = await axios.put(
        `http://localhost:8080/api/stock/${productId}`,
        { quantity: quantityToSave }
      );

      if (result.status === 200) {
        const updatedProducts = products.map((product) =>
          product.id === productId
            ? { ...product, quantity: quantityToSave }
            : product
        );
        setProducts(updatedProducts);
        setEditProductId(null); 
        setEditQuantity({}); 
      }
    } catch (error) {
      console.log("Error updating product quantity", error);
    }
  };


  //new product
  

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}



      <form className="col-md m-3">
          
        <div className="row border">
        
              <div className="col-md-1 border">
                <div className="badge fs-5 text-dark">Search :</div>
              </div>
              <div className="col-md-2">
                 <input
                  type="text"
                  min="0"
                  max="300"
                  placeholder="Product Id"
                  value={newProduct.id}
                  onChange={(e) =>
                  handleQuantityChange(newProduct.id, e.target.value)
                  }
                  className="form-control"
                />
              </div>

              <div className="col-md-3">
                <div className="badge fs-5 text-dark">Add New Entry :</div>
              </div>
             
              <div className="col-md-3">
                 <input
                  type="number"
                  min="0"
                  max="300"
                  placeholder="Product Id"
                  value={newProduct.id}
                  onChange={(e) =>
                  handleQuantityChange(newProduct.id, e.target.value)
                  }
                  className="form-control"
                />
              </div>

              <div className="col-md-3">
                <input
                  type="number"
                  placeholder="Quantity"
                  min="0"
                  max="300"
                  value={''}
                  onChange={(e) =>
                  handleQuantityChange(newProduct.quantity, e.target.value)
                  }
                  className="form-control"
                />
              </div>
        </div>
          
      </form>

      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr className="text-center">
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Brand</th>
            <th>Unit Price in ₹</th>
            <th>Stock</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {products
            .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
            .map((product) => (
              <tr key={product.id}>
                <th>{product.id}</th>
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
                        handleQuantityChange(product.id, e.target.value)
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
                    <button
                      className="btn btn-success"
                      onClick={() => handleSaveClick(product.id)}
                    >
                      <FaSave /> Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleEditClick(product.id, product.quantity)
                      }
                    >
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
