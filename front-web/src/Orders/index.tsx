import './styles.css';
import StepsHeader from './StepsHeader';
import ProductList from './ProductList';
import { Product } from './types';
import { useEffect, useState } from 'react';
import { fetchProducts } from './api';
import OrderLocation from './OrderLocation';
import { OrderLocationdata } from './types';


function Orders(){
    const [products, setProducts] = useState<Product[]>([]);
    const [orderLocation, setOrderLocation] = useState<OrderLocationdata>();



    useEffect(() => {
      fetchProducts()
        .then(response => setProducts(response.data))
        .catch(error => console.log(error))  

    }, []);


    return (
       <div className="orders-container">
           <StepsHeader/>
           <ProductList products={products}/>
           <OrderLocation onChangeLocation={Location => setOrderLocation(Location)}/>           
       </div>

    )
}

export default Orders;

