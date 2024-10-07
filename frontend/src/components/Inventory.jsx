import axios from "axios";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { FaEdit } from "react-icons/fa";


function Inventory (){

    const moment = require('moment');
    const [products, setProducts] = useState([]);

    
    
    const fetchProducts = async () => {
        try{
            const result = await axios.get(`http://localhost:8080/api/stock`,{
                validateStatus: () => true
            });
            if(result.status ===200){
                const data = result.data.map((item)=>({
                    invid:item.id,
                    id: item.product.id,
                    name: item.product.name,
                    price: item.product.price,
                    brand:item.product.brand.name,
                    quantity: item.quantity,
                    updated: moment(item.lastUpdated).format('l')
                }));
                console.log(result)
                setProducts(data);
            }
        }catch(error){
        console.log("Error Fetching Products")
        }
    }
    useEffect( ()=>{
        fetchProducts();
    },[] )

    return(
        <div>
       <table className="table table-bordered table-hover shadow">
        <thead>
            <tr className="text-center">
                <th>Product Id</th>
                <th>Product name</th>
                <th>Brand</th>
                <th>Unit Price in ₹</th>
                <th>Stock</th>
                <th>Last Updated</th>
                <th colSpan="3">Actions</th>
            </tr>
        </thead>
      

       <tbody className="text-center">
            {products
            .filter((p)=>
                p.name.toLowerCase().includes('')
            )
            .sort((a,b)=>{
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if(nameA < nameB){
                    return -1;
                }
                if(nameA > nameB){
                    return 1;
                }
                return 0;

            }

            )
            .map((product) => (
                <tr key={product.id}>
                    <th>{product.id}</th>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.updated}</td>
                    <td className="mx-2">
                        <button className="btn btn-primary">
                           <Link  to={`/product/${product.invid}`}>
                                <FaEdit/>
                            </Link>
                        </button>
                    </td>
                    {/* <td className="mx-2">
                        <button className="btn btn-danger">Delete</button>
                    </td>
                    <td className="mx-2">
                        <button className="btn btn-info">View</button>
                    </td> */}
                </tr>
            ))}

       </tbody>
       </table>

       </div>
    );
}

export default Inventory;
