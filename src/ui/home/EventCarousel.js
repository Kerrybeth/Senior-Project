import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Carousel from 'react-bootstrap/Carousel';
import { Box } from "@mui/material";
import '../../App.css';

function EventCarousel() {
    return (
        <Box
            sx={{
                display: 'colum',
                justifyContent: 'space-between',
                alignItems: 'center',
                m: 3
            }}
        >
            <Carousel interval='10000' controls={false} indicators={false}>
                <Carousel.Item>
                    <CardGroup>
                        <Card bg='dark'>
                            <Card.Body>
                                <Card.Title>Event 1</Card.Title>
                                <Card.Text>This event is scheduled for next week</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card bg='dark'>
                            <Card.Body>
                                <Card.Title>Event 1</Card.Title>
                                <Card.Text>This event is scheduled for next week</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card bg='dark'>
                            <Card.Body>
                                <Card.Title>Event 1</Card.Title>
                                <Card.Text>This event is scheduled for next week</Card.Text>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Carousel.Item>
                <Carousel.Item>
                    <CardGroup>
                        <Card bg='dark'>
                            <Card.Body>
                                <Card.Title>Event 2</Card.Title>
                                <Card.Text>This event is scheduled for next week</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card bg='dark'>
                            <Card.Body>
                                <Card.Title>Event 2</Card.Title>
                                <Card.Text>This event is scheduled for next week</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card bg='dark'>
                            <Card.Body>
                                <Card.Title>Event 2</Card.Title>
                                <Card.Text>This event is scheduled for next week</Card.Text>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Carousel.Item>
            </Carousel>
        </Box>
    );
}

export default EventCarousel;
