import React, { useEffect, useState } from 'react'
import { Nav, Container, Navbar,  Form, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProduct } from '../Redux/slice/productSlice'



function Header({insideHome}) {
  const dispatch = useDispatch()
  const [wishlistCount,setWishlistCount] = useState(0)
  const [cartCount,setCartCount] = useState(0)
  const {wishlist} = useSelector(state=>state.wishListReducer)
  const cart = useSelector((state)=>state.cartReducer)

  useEffect(()=>{
    setWishlistCount(wishlist.length)
    setCartCount(cart.length)
  },[wishlist,cart])
  return (
    <>
      <Navbar expand="lg" className="bg-secondary">
      <Container>
        <Navbar.Brand>
          <Link to={'/'} style={{textDecoration:"none",color:"black",fontSize:"25px"}}><i class="fa-solid fa-truck-fast fa-beat-fade me-3"></i>
          E-Cart
          </Link>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {insideHome&&<Form.Control
              type="text"
              placeholder="Search"
              className="ms-auto w-25"
              onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))}
            />}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

            <Nav.Link className='btn btn-outline-light'>
              <Link to={'/wishlist'} style={{color:"black",fontWeight:"bold",textDecoration:"none"}}><i class="fa-solid fa-heart text-danger mx-1"></i>Wishlist
              <Badge bg="success rounded ms-2">{wishlistCount}</Badge></Link>
            </Nav.Link>


           <Nav.Link className='btn btn-outline-light ms-2'>
              <Link to={'/cart'} style={{color:"black",fontWeight:"bold",textDecoration:"none"}}><i class="fa-solid fa-cart-shopping text-warning mx-1"></i>Cart
              <Badge bg="success rounded ms-2">{cartCount}</Badge></Link>
            </Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Header
