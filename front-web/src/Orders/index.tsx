import './styles.css';
import StepsHeader from './StepsHeader';
import ProductList from './ProductList';
import { Product } from './types';
import { useEffect, useState } from 'react';
import { fetchProducts } from './api';
//import {ReactComponent as Logo} from './logo.svg';

function Orders(){
    const [products, setProducts] = useState<Product[]>([]);
 



    useEffect(() => {
      fetchProducts()
        .then(response => setProducts(response.data))
        .catch(error => console.log(error))  

    }, []);


    return (
       <div className="orders-container">
           <StepsHeader/>
           <ProductList products={products}/>
           
           
       </div>

    )
}

export default Orders;

