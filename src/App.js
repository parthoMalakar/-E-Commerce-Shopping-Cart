import Cart from './Cart';
import Navbar from './Navbar';
import React from 'react';
import firebase from 'firebase';

class App extends React.Component {

  constructor () {
    super();
    this.state = {
      products: [],
      loading: true
    }

    this.db = firebase.firestore();

  }

  componentDidMount() {
    // firebase
    //   .firestore()
    //   .collection("products")
    //   .get()
    //   .then(snapshot => {
    //     const products = snapshot.docs.map(doc => {
    //       const data = doc.data();
    //       data["id"] = doc.id;
    //       return data;
    //     });
    //     this.setState({ products: products, loading: false });
    //   });

    this.db
      .collection("products")
      // .where('price', '==', 79900)
      // .where('title', '==', 'iPhone 12')
      .orderBy('price', 'desc')
      .onSnapshot((snapshot => {
          const products = snapshot.docs.map(doc => {
          const data = doc.data();
          data["id"] = doc.id;
            return data;
          });
          this.setState({ products: products, loading: false });
        })
      )
  }

  handleIncreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;

    // this.setState({
    //   products
    // })
    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty + 1
      })
      .then(() => {
        console.log('Documnent Updated Sucessfully');
      })
      .catch((error) => {
        console.log('Error:', error);
      })

  }
  
  handleDecreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    // products[index].qty -= 1;

    // this.setState({
    //   products
    // })
    const docRef = this.db.collection('products').doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty - 1
      })
      .then(() => {
        console.log('Documnent Updated Sucessfully');
      })
      .catch((error) => {
        console.log('Error:', error);
      })

  }

  handleDeleteProduct = (id) => {
    const { products, loading } = this.state;

    // const items = products.filter((item) => item.id !== id); // [{}]

    // this.setState({
    //   products: items
    // })

    const docRef = this.db.collection('products').doc(id);

    docRef
      .delete()
      .then(() => {
        console.log('Documnent Deleted Sucessfully');
      })
      .catch((error) => {
        console.log('Error:', error);
      })
  }

  getCartCount = () => {
    const {products} = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getCartTotal = () => {
    const {products} = this.state;

    let cartTotal = 0;

    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price;

      return '';
    })
    return cartTotal;
  }

  addProduct = () => {
    this.db
      .collection('products')
      .add({
        img: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MRXJ2?wid=572&hei=572&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1551489675083',
        price: 18900,
        title: "AirPods",
        qty: 1
      })
      .then((docRef) => {
        console.log('Product has been addded', docRef);
      })
      .catch((error)=> {
        console.log('Error:', error);
      })

  }

render () {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()}/>
        {/* <button onClick={this.addProduct}>Add a product</button> */}
        <Cart
        products = {products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{padding: 10, fontSize: 20}}>TOTAL: {this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
