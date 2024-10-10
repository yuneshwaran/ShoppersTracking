import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Product =()=>{

    const {id} = useParams;
    const [product,setProduct] = useState({
		id:"",
		name:"",
		quantity:""
		})

    const loadProduct = async ()=>{

        try{
            const response = await axios.get(`http://localhost:8080/api/stock/${id}`,{
                validateStatus: ()=> true
            });
            if(response.status ===200){
                setProduct(response.data)
				console.log(response)
            }
        }
        catch(error){
            console.log(error)
        }
    }

	useEffect(()=>{
		loadProduct()
	},[])
 
    return(
<section className="shadow" style={{ backgroundColor: "whitesmoke", padding: "20px" }}>
			<div className="container py-5">
				<div className="card mb-4">
					<div className="card-body text-center">
						<h5 className="mb-4">Product Page</h5>

						<div className="row mb-3">
							<div className="col-sm-4">
								<h5 className="mb-0">Product name</h5>
							</div>
							<div className="col-sm-8">
								<p className="text-muted mb-0">{product.name}</p>
							</div>
						</div>
						<div className="row mb-3">
							<div className="col-sm-4">
								<h5 className="mb-0">Product Quantity</h5>
							</div>
							<div className="col-sm-8">
								<p className="text-muted mb-0">{product.stock}</p>
							</div>
						</div>

							<button className="btn-sm-8 btn-outline-dark"  >
						Logout
					</button>
						</div>
					</div>
				</div>

		</section>
    )

}

export default Product;