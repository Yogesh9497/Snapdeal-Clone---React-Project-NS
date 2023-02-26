import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItem, increaseQuantity, decreaseQuantity } from '../src/redux/reducer/cartSlice'
// import PaymentPage from './PaymentPage';
const Cart = () => {

  const items = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.total);
  const dispatch = useDispatch();

  const navigate= useNavigate();


  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <h2>Cart</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover >
            <thead style={{textAlign:'center'}}>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style={{ textAlign:'center', alignItems: 'center'}}>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt='product-image'
                    style={{height:'100px', width:'100px'}}></img>
                  </td>
                  
                  <td>{item.title}</td>
                  <td>
                    <Button variant="secondary" size="sm" onClick={() => {dispatch(decreaseQuantity(item.id))
                    toast.error("Quantity Decreased")}}>
                      -
                    </Button>{' '}
                    {item.quantity}{' '}
                    <Button variant="secondary" size="sm" onClick={() => {dispatch(increaseQuantity(item.id))
                    toast.success("Quantity Increased")}}>
                      +
                    </Button>
                  </td>
                  <td>Rs.{item.price * item.quantity}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => { dispatch(removeItem(item.id))
                    toast.error("Product Removed")}}>Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2" className="text-end">
                  Total: Rs.
                </td>
                <td colSpan="2">{total}</td>
              </tr>
            </tfoot>
          </Table>
          {total>0 ? <Button onClick={()=>navigate('/payment') }>Proceed To Payment</Button>
:   <Button disabled >Proceed To Payment</Button>
}
                 </Col>
      </Row>
    </Container>
  );
};

export default Cart;
