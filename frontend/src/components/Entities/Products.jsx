import { useState ,useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

function Products (){

    const [products, setProducts] = useState([]);

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
          
        } catch (error) {
          console.error('Error fetching TrialRooms:', error);
        }
  
      };
      fetchProducts();
    },[])

    return(
      <div className="log-list-container">
        <h3 className="text-light mb-3">Products</h3>
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
              {products.map((product) => (
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