import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function About() {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="p-4 shadow">
                        <Card.Body>
                            <h1 className="text-center">About Shoppers Tracking System</h1>
                            <p className="text-center mt-4">
                                Our Shopper Tracking System helps retailers monitor shopper behavior in real-time by using shelf sensors to track interactions, time spent, and trial room usage.
                            </p>
                            <p className="text-center">
                                The system generates valuable insights such as trial-to-purchase ratios, allowing businesses to optimize inventory and enhance customer experience. All data is processed securely with modern authentication practices.
                            </p>
                            <p className="text-center">
                                Explore the dashboard to manage and view real-time logs, sensor activity, and analytics.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default About;
