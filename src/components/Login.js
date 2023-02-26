import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/reducer/authorisation'
import {toast} from 'react-hot-toast';


export default function Login() {

  const {users} = useSelector((state)=>state.snapdeal_user)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading("Loading.....");
    const checkUser = users.filter(
        (item) =>
          (item.email &&
            item.email.toLowerCase().includes(email.toLowerCase())) ||
          (item.phone && item.phone.toLowerCase().includes(email.toLowerCase()))
      );
       if(checkUser.length !== 0){
        if(checkUser[0].password === password){
            dispatch(login({
                name:checkUser[0].name,
                email:checkUser[0].email
            }));
            setLoading('');
            toast.success('Login Successfully');
            navigate('/');
        }else{
            setLoading('');
            toast.error('Couldn’t find the account');
        }
       }
    };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center ">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
