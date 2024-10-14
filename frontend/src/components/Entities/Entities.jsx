import { useState ,useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";

export const Shelves = () => {
    const [shelf, setShelf] = useState([]);
  
    useEffect(() => {
      const fetchShelf = async () => {
        try {
          const token = localStorage.getItem('jwt');
          const response = await axios.get('http://localhost:8080/api/shelf', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setShelf(response.data);
          
        } catch (error) {
          console.error('Error fetching shelf:', error);
        }
      };
      
      fetchShelf();
    }, []);
  
    return (
      <div className="log-list-container">
        <h3 className="text-light mb-3">Shelves</h3>
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th> Id</th>
                <th> Name</th>
                <th> Location</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {shelf.map((shelf) => (
                <tr key={shelf.id}>
                  <td>{shelf.id}</td>
                  <td>{shelf.name}</td>
                  <td>{shelf.location}</td>
                  <td>{dayjs(shelf.lastUpdated).format(' YYYY-MM-DD  HH:mm:ss')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export const Products =()=>{

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

  export const HangerSensor =()=>{

    const [sensors, setSensors] = useState([]);

    useEffect(()=>{
      const fetchSensor =async() =>{
        try {
          const token = localStorage.getItem('jwt');
          const response = await axios.get('http://localhost:8080/api/sensors/hanger', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setSensors(response.data);
          
        } catch (error) {
          console.error('Error fetching Hanger Sensor Data:', error);
        }
  
      };
      fetchSensor();
    },[])

    return(
      <div className="log-list-container">
        <h3 className="text-light mb-3">Hanger Sensors</h3>
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th> Id</th>
                <th> Shelf id</th>
                <th>Product name</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {sensors.map((sensor) => (
                <tr key={sensor.id}>
                  <td>{sensor.id}</td>
                  <td>{sensor.shelf.id}</td>
                  <td>{sensor.product.name}</td>
                  <td>{dayjs(sensor.lastUpdated).format(' YYYY-MM-DD  HH:mm:ss')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
