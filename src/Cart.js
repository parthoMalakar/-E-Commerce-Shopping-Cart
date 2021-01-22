import React from 'react';
import CartItem from './CartItem'

class Cart extends React.Component {
    constructor () {
        super();
        this.state = {
            products: [
                {
                    price: 999,
                    title: 'Watch',
                    qty: 1,
                    img: "",
                    id: 1
                },
                {
                    price: 9999,
                    title: 'Mobile Phone',
                    qty: 2,
                    img: "",
                    id: 2
                },
                {
                    price: 99999,
                    title: 'Laptop',
                    qty: 0,
                    img: "",
                    id: 3
                }
            ]
        }

         // this.increaseQuantity = this.increaseQuantity.bind(this);
         // this.testing();
    }

    render () {
        const {products} = this.state;
        return (
             
            <div className='cart'>
                {products.map((product) => {
                    return (
                    <CartItem 
                        product={product} 
                        key={product.id}
                        // func={ () => console.log("Testing a function in CartItem Component")}
                        // isLoggedIn ={false}
                        // jsx={<h1>Test</h1>}
                        
                    />
                    )
                })}
            </div>
        ) 
    }
}



export default Cart;