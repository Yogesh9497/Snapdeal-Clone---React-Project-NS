import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import {  useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from '../src/redux/reducer/cartSlice'
const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('https://content.newtonschool.co/v1/pr/63b6c911af4f30335b4b3b89/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const filterProducts = (product) => {
    if (category === 'All') {
      return true;
    }
    return product.title.toLowerCase().includes(category.toLowerCase());
  };

  const searchProducts = (product) => {
    if (searchTerm === '') {
      return true;
    }
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleAddTocart = (product)=>{
    dispatch(addItem(product));
    toast.success("Item Added");
  }

  return (
    <Container className="mt-3">
      <div style={{alignItems:'center', textAlign:"center", margin: "20px 20px"}}>
      <strong style={{fontWeight:'600', fontSize:'50px',alignItems:'center', textAlign:"center"}}>Featured Products</strong>
      </div>
      <Row className="mb-3">
        <Col>
          <select className="form-select" value={category} onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Electronics">Electronics</option>
            <option value="Jewellery">Jewellery</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </Col>
        <Col>
          <input
            className="form-control"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Col>

      </Row>
      <Row xs={1} sm={2} md={3} lg={4} xl={5} xxl={6}>
        {products
          .filter(filterProducts)
          .filter(searchProducts)
          .map((product) => (
               
            <Col key={product.id} className='mb-5'>
              <Card className="mb-3 h-100">
                <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                <Link to={`/products/${product.id}`}>
                  <Card.Img variant="top" src={product.image} className="h-100 w-100 object-fit-cover" />
                  </Link>
                  <Button variant="danger" className="position-absolute bottom-0 start-0"
                  onClick={()=>handleAddTocart(product)}>
                    Add to Cart
                  </Button>
                </div>
                <Card.Body>
                  <Card.Title className="text-truncate">{product.title}</Card.Title>
                  <Card.Text className="text-truncate">{product.description.substring(0, 15)}...</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{`Price: Rs.${product.price}`}</small>
                  <br />
                  <small className="text-muted">{`Rating: ${product.rating.rate} (${product.rating.count})`}</small>
                </Card.Footer>
              </Card>
            </Col>
            
          ))}
      </Row>
    </Container>
  );
};

export default Products;
