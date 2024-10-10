import Carousel from 'react-bootstrap/Carousel';
import hanger from '../assets/Test.jpg';
import entrance from '../assets/BirdViewMall.jpg';
import shelf from '../assets/ShelfRack.jpg';
import storage from '../assets/Inventory.jpg';

function Home (){
return(
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '0 10px',
        
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          maxHeight: '530px', 
        }}>
          <Carousel style={{ margin: '0 auto' ,maxHeight: '530px'}}>
            <Carousel.Item interval={1000}>
              <img src={hanger} alt="Hanger" style={{ width: '100%', height: '530px' }} />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item interval={500}>
              <img src={storage} alt="Storage" style={{ width: '100%', height: '530px' }} />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img src={entrance} alt="Entrance" style={{ width: '100%', height: '530px' }} />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>

      </div>
)
}

export default Home;