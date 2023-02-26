import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addItem } from '../src/redux/reducer/cartSlice'
import { toast } from "react-hot-toast";
const SingleProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);


  const dispatch = useDispatch()
  const handleAddToCart =(product)=>{
    dispatch(addItem(product));
    toast.success("Item Added");
  }

  useEffect(() => {
    
    fetch(`https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error));
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container style={{margin:'90px'}}>
      <Row>
        <Col md={6}>
          <img src={product.image} alt={product.title} className="img-fluid" />
        </Col>
        <Col md={6}>
          <h1 className="mb-0">{product.title}</h1>
          <p className="text-muted">{product.description}</p>
          <h2 className="text-primary">Rs. {product.price}</h2>
          <hr />
          <p className="mb-1">In Stock</p>
          <hr />
          <Button variant="primary" className="mr-2"
          onClick={()=>{handleAddToCart(product)}}>
            Add to Cart
          </Button>
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

export default SingleProductPage;
