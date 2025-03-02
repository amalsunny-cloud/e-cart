import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromWishlist } from '../Redux/slice/wishlistSlice'
import { addToCart } from '../Redux/slice/cartSlice'



function Wishlist() {


  const {wishlist} = useSelector(state=>state.wishListReducer)
  const dispatch = useDispatch()

  const handleCart = (product)=>{
    dispatch(addToCart(product))
    dispatch(removeFromWishlist(product?.id))
  }
  return (
    <>
    <Header/>

<div style={{marginTop:"50px",paddingLeft:"50px"}} className='container-fluid'>
<Row>
  {wishlist?.length>0?wishlist.map(product=>(
    <Col>
    
        <Card style={{ width: '18rem',borderRadius:"20px" ,padding:"10px" }}>
<Card.Img variant="top" width={"100%"} src={product?.thumbnail} />
<Card.Body>
  <Card.Title style={{color:"red"}}>{product?.title}</Card.Title>
  <Card.Text>
    Some quick example text to build on the card title and make up the
    bulk of the card's content.
  </Card.Text>

  <div className="d-flex justify-content-between">
    <Button className='btn btn-light'  onClick={()=>dispatch(removeFromWishlist(product?.id))}><i className='fa-solid fa-trash text-danger'></i></Button>
    <Button className='btn btn-light' onClick={()=>handleCart(product)}><i className='fa-solid fa-cart-plus text-info'></i></Button>
  </div>
</Card.Body>
</Card>
  </Col>)):<div className='text-center'>
    <img src="https://krosfitsports.com/public/empty-cart.gif" alt="" />
    <h2 className='text-danger mt-5'>Your Wishlist is empty...</h2>
    </div>}
</Row>
</div>
    </>
  )
}

export default Wishlist
