import React, {
  useState,
  useEffect,
} from 'react';
import {
  Button,
  ListGroup,
} from 'react-bootstrap';
import store from '../../redux/store';
import { deleteItem, addItem, getItems } from '../../redux/actions/actions';
import AddItem from '../addItem/AddItem';
import ListItem from '../listItem/ListItem';

const ShoppingList = () => {

  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);


  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleAddItem = () => {
    text && text.trim() &&
      store.dispatch(addItem({
        name: text,
      }));
    setShow(false);
  }

  const handleInput = text => {
    setText(text);
  }

  const handleDeleteItem = (id) => {
    store.dispatch(deleteItem(id));
  }

  const getStateFromRedux = () => {
    const reducers = store.getState();
    const { item } = reducers;
    setItems([...items, ...item.items]);
    setLoading(item.loading);
  }

  useEffect(() => {
    store.dispatch(getItems())
    getStateFromRedux();
    store.subscribe(getStateFromRedux);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div>
      <AddItem
        show={show}
        btnText="Add"
        formHeading="Add Item"
        handleInput={handleInput}
        handleClose={handleClose}
        handleSecondAction={handleAddItem}
      />
      {loading ? (
        <div className="loader-wrapper">
          <img src={require('../../images/Loadingsome.gif')} className="loader" alt="not found" />
        </div>
      ) : (
          <>
            <div className="add-button-wrapper">
              <Button
                onClick={handleShow}
                variant="outline-info"
                className="add-button"
              >
                Add Item
              </Button>
            </div>
            {items.length > 0 ? (
              <ListGroup>
                {items.map((v, i) => {
                  return (
                    <ListItem
                      key={i}
                      text={v.name}
                      onDeleteItem={() => handleDeleteItem(v._id)}
                    />
                  )
                })}
              </ListGroup>
            ) : (
                <p className="text-center text-danger" style={{ marginTop: 40 }}>Empty List!</p>
              )}
          </>
        )}
    </div>
  )
};

export default ShoppingList;