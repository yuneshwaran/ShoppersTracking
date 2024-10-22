import Carousel from 'react-bootstrap/Carousel';
import entrance from '../assets/BirdViewMall.jpg';
import shelf from '../assets/ShelfRack.jpg';
import storage from '../assets/Inventory.jpg';
import './Styles.css';
import About from './About';

function Home() {
  return (
    <div className="home-container">

      <Carousel className="home-carousel">
        <Carousel.Item interval={3000}>
          <img src={shelf} alt="Hanger" className="carousel-image" />
          <Carousel.Caption>
            <h3>Track user interactions with products. </h3>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={3000}>
          <img src={storage} alt="Storage" className="carousel-image" />
          <Carousel.Caption className='shadow'>
            <h3>Inventory management along with purchase logging.</h3>
            
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={3000}>
          <img src={entrance} alt="Entrance" className="carousel-image" />
          <Carousel.Caption>
            <h3 >Insight generation to help better understand the customer.</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>


      <div className="container-fluid ">
        <About/>  
      </div>

    </div>
  );
}
export default Home;