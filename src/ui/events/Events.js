import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const Events = () => {
    return (
        <div className="pageLight">
			<div className="tabList">
				<Tabs
				defaultActiveKey="first"
				id="events-tabs"
				className="mb-3"
				>
					<Tab eventKey="first" title="Daily">
						<ListGroup>
							<ListGroup.Item>
								<div>
									<h2>Events Name 1</h2>
									Start and End Time:
									<br />
									Location: 
								</div>
							</ListGroup.Item>
						</ListGroup>
					</Tab>
					<Tab eventKey="second" title="Weekly">
						<ListGroup>
							<ListGroup.Item>
								<div>
									<h2>Events Name 1</h2>
									Date and Time:
									<br />
									Location: 
								</div>
							</ListGroup.Item>
						</ListGroup>
					</Tab>
					<Tab eventKey="third" title="Monthly">
						<ListGroup>
							<ListGroup.Item>
								<div>
									<h2>Events Name 1</h2>
									Date and Time:
									<br />
									Location: 
								</div>
							</ListGroup.Item>
						</ListGroup>
					</Tab>
				</Tabs>
			</div>
			<Link to="/CreateEvents">
				<Button variant="secondary">
					Create Event
				</Button>
			</Link>
			<Link to="/CreateGroupEvents">
				<Button variant="secondary">
					Create Group Event
				</Button>
			</Link>
		</div>
    );
}

export default Events; 