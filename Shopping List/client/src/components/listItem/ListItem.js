import React from 'react';
import {
    Button,
    ListGroup,
    ButtonGroup,
} from 'react-bootstrap';

const ListItem = props => (
    <ListGroup.Item>
        <div className="list-item-wrapper">
            <div className="list-item-icon-wrapper">
                <ButtonGroup className="mr-2" aria-label="First group">
                    {/* <Button variant="info" onClick={props.onDeleteItem}>&#128393;</Button> */}
                    <Button variant="danger" onClick={props.onDeleteItem}>x</Button>
                </ButtonGroup>
            </div>
            <div className="list-item-text-wrapper">
                {props.text}
            </div>
        </div>
    </ListGroup.Item>
)

export default ListItem;
