import React from 'react';
import {
  Form,
  Modal,
  Button,
} from 'react-bootstrap';

const AddItem = props => {
  const { show, handleClose, btnText, formHeading, handleSecondAction, handleInput } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{formHeading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              onChange={e => handleInput(e.target.value)}
              placeholder="Enter Something"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
          </Button>
        <Button variant="primary" onClick={handleSecondAction}>
          {btnText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
};

export default AddItem;