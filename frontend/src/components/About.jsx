import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './Styles.css'; 

function About() {
    const handleContact = () => {
        window.location.href = 'mailto:yuneshwaranr@unitedtechno.com'; 
    };

    return (
        <Container fluid className="mt-5">
            <Row className="justify-content-center">
                <Col md={12} className="px-0">
                    <Card className="p-4 shadow card">
                        <Card.Body>
                            <h1 className="text-center title"><u> Shoppers Tracking System</u></h1>
                            <p className="text-center mt-4 font-weight-bold description">
                                 Shopper Tracking System provides retailers with the tools to monitor shopper behavior in real-time, 
                                utilizing shelf sensors and hanger sensors to capture valuable data on shopper interactions 
                                and experiences.
                            </p>

                            <h2 className="mt-4 text-center subheading"><u>Key Features</u></h2>
                            
                            <ul className="list-unstyled mt-3">
                                <li>
                                    <h5>🔍 Live Tracking of Purchases</h5>
                                    <p>
                                        Get real-time updates on shopper purchases, allowing retailers to analyze consumer behavior 
                                        and make informed decisions about inventory and products.
                                    </p>
                                </li>
                                <li>
                                    <h5>📊 Logs from Shelf Sensors</h5>
                                    <p>
                                        Tracks how long shoppers spend in front of each shelf with the help of the shelf sensors,providing
                                        insights into which range of products attract attention and which may require adjustments in placement.
                                    </p>
                                </li>
                                <li>
                                    <h5>📈 Hanger Sensor Data</h5>
                                    <p>
                                        Monitor trial room usage and interactions with clothing on hangers, allowing retailers 
                                        to identify trends in shopper preferences and optimize their product offerings.
                                    </p>
                                </li>
                                <li>
                                    <h5>📦 Inventory Management</h5>
                                    <p>
                                        Manage inventory effortlessly with the option to update stock levels in real time. Ensure that 
                                        popular items are always available and adjust stock based on shopper interest.
                                    </p>
                                </li>
                            </ul>

                            <p className="text-center mt-4 conclusion">
                                With these features, this system helps businesses enhance customer experience, 
                                optimize inventory, and drive sales growth. 
                            </p>
                            <p className="text-center conclusion">
                                Explore the dashboard to view real-time logs from sensors, purchases, and comprehensive analytics 
                                to take your retail strategy to the next level.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <footer className="bg-dark text-white mt-5">
                <div className='container bg-dark mx-auto align-items-center text-center p-3'>
                    <h5>Shoppers Tracker System</h5>
                    <span className='d-flex justify-content-center'>
                        <a className='links' onClick={handleContact}>Contact</a>
                        {/* <a className='links mx-3'>Feedback</a>
                        <a className='links'>Location</a> */}
                    </span>
                </div>
            </footer>
        </Container>
    );
}

export default About;
