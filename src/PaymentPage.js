import { useState } from "react";
import { Button, Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { removeAllItems } from '../src/redux/reducer/cartSlice'
import { useDispatch, useSelector } from "react-redux";
function PaymentPage() {

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.items)

  const handlePayNowClick = () => {
    toast.success("Payment proceeded");
    dispatch(removeAllItems());
    navigate('/');

  };

  return (
    <div className="container mt-3">
      <h1>Payment Page</h1>
      <Form>
        <Form.Group controlId="cardNumber">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter card number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="expiryDate">
          <Form.Label>Expiry Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter expiry date (MM/YY)"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="cvv">
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handlePayNowClick}>
          Pay Now
        </Button>
      </Form>
    </div>
  );
}

export default PaymentPage;
