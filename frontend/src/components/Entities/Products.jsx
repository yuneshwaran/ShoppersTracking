import { useState ,useEffect } from "react";
import axios from "axios";
function Products (){

    const [products, setProducts] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);


    const handleSearchChange = (value) => {
      setSearchValue(value);
      const filtered = value
        ? products.filter(
            product =>
              product.id.toString().includes(value) ||
              product.name.toLowerCase().includes(value.toLowerCase()) ||
              product.brand.name.toLowerCase().includes(value.toLowerCase())
          )
        : products;
      setFilteredProducts(filtered);
    };

    useEffect(()=>{
      const fetchProducts =async() =>{
        try {
          const token = localStorage.getItem('jwt');
          const response = await axios.get('http://localhost:8080/api/brand/product', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setProducts(response.data);
          setFilteredProducts(response.data)
          
        } catch (error) {
          console.error('Error fetching TrialRooms:', error);
        }
  
      };
      fetchProducts();
    },[])

    return(
      <div className="log-list-container">
        <h3 className="text-light mb-3">Products</h3>

          <div className="row border  mb-4 align-items-center">
                <div className="col-md-4 text-end">
                  <div className="fs-5 badge text-light">Search:</div>
                </div>

                <div className="col-md-5">
                  <input
                    type="text"
                    placeholder="Search by Product Id or Name"
                    value={searchValue}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="form-control"
                  />
                </div>

          </div>
    
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th> Id</th>
                <th> Name</th>
                <th> Brand</th>
                <th>Shelf id</th>
                <th> Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.brand.name}</td>
                  <td>{product.shelf.id}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  export default Products;