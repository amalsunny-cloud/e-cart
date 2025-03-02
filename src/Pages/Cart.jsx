import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { emptyCart, removeFromCart } from '../Redux/slice/cartSlice'
import { Link } from 'react-router-dom'


function Cart() {
  const cart = useSelector((state)=>state.cartReducer)
  const dispatch = useDispatch()
  const [total,setTotal]  = useState(0)


  useEffect(()=>{
    if(cart?.length>0){
      setTotal(cart?.map(product=>product?.totalPrice).reduce((p1,p2)=>p1+p2))
    }
    else{
      setTotal(0)
    }
  },[cart])

  return (
   <div>
    <Header/>
    <div style={{marginTop:"100px"}}>

        {
          cart.length>0?(
            <div>
              <div className="row container">
                <div className="col-lg-1"></div>
                  <div className="col-lg-7">
                    <div className="table shadow p-3 rounded-4">
                      <table>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Image</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Action</th>
                        </tr>
                        {cart?.map((product,index)=>(
                        <tr>
                          <td>{index+1}</td>
                          <td>{product.title}</td>
                          <td><img src={product.thumbnail} alt="" width={"100%"} height={'200px'}/></td>
                          <td><input type="text" readOnly value={product.quantity} style={{width:"25px"}}/></td>
                          <td>${product.totalPrice}</td>
                          <td><button className='btn' onClick={()=>dispatch(removeFromCart(product?.id))}><i className='fa-solid fa-trash text-danger'></i></button></td>
                        </tr>))
                            }
                      </table>


                      <div className="d-flex justify-content-between m-3 pb-3"><button className='btn btn-danger' onClick={()=>dispatch(emptyCart())}>Empty Cart</button>
                      <Link to={'/'} className='btn btn-info'>Shop more</Link>
                      </div>


                    </div>
                </div>
              <div className="col-lg-1"></div>
              <div className="col-lg-3">
                <div className="card shadow rounded p-5">
                  <h2 className='text-dark fw-bold'>Cart Summary</h2>
                  <h3><span className='text-dark fw-bold'>Total Products: </span>{cart?.length}</h3>
                  <h3>Total Price:<span className='text-danger fw-bolder'>${total}</span></h3>
                </div>
                <div className="d-grid">
                  <button className='btn btn-success mt-2'>Checkout</button>
                </div>
              </div>

              
              
            </div>

            
            </div>):<div className='text-center'>
            <img src="https://krosfitsports.com/public/empty-cart.gif" alt="" />
            <h2 className='text-danger mt-5'>Your Wishlist is empty...</h2>
            </div>
            
        }
      </div>
    </div>
           
  )
  
}

export default Cart
