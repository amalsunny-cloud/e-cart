import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Header from '../Components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist } from '../Redux/slice/wishlistSlice'
import { addToCart } from '../Redux/slice/cartSlice'
// import wishListReducer from '../Redux/cartStore'




function View() {

  const {id} = useParams()  //can handle path related informations from components

  const [product,setProduct] = useState({})
  // console.log(id);

  const {wishlist} = useSelector(state=>state.wishListReducer)

  const cart = useSelector((state)=>state.cartReducer)

  
  const dispatch =  useDispatch()

  useEffect(()=>{
    if(localStorage.getItem("allProducts")){
      const allProducts=JSON.parse(localStorage.getItem("allProducts"))
      setProduct(allProducts.find(item=>item.id==id))
    }
    else{
      setProduct("")
    }

  },[])
  console.log(product);
  


  const handleWishlist=(product)=>{
    const existingProduct = wishlist.find(item=>item.id==product.id)
    if(existingProduct){
      alert("Product already exists")
    }
    else{
      dispatch(addToWishlist(product))
    }
  }


  const handleCart = (product)=>{
    const existingProduct = cart?.find(item=>item.id == product.id)


    if(existingProduct){
      alert("Items added")
      dispatch(addToCart(product))
    }
    else{
      alert("Items added")
      dispatch(addToCart(product))
    }
  }
  
  return (
    <>
        <Header/>
      <div className="container mt-5 row" style={{marginTop:"200px",marginBottom:"150px"}}>
          <div className="col-lg-4"><img src={product?.thumbnail} width={'100%'} alt="" style={{marginTop:"-60px"}}/></div>
          <div className="col-lg-2"></div>
          <div className="col-lg-5">
            <p className='text-warning fw-bolder'>Pid:{product?.id}</p>
            <h1>{product?.title}</h1>
            <p>{product?.description}</p>
            <h3>Price: <span>{product?.price}</span></h3>
          </div>

          <div className="d-flex justify-content-around">
            <Button className='btn btn-outline-dark' onClick={()=>handleWishlist(product)}><i className='fa-solid fa-heart text-danger'></i>Wishlist</Button>
            <Button className='btn btn-outline-light' onClick={()=>handleCart(product)}><i className='fa-solid fa-cart-plus text-info'></i>Cart</Button>        
          </div>
      </div>
    </>
  )
}

export default View
