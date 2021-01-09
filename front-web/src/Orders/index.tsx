import './styles.css';
import StepsHeader from './StepsHeader';
import ProductList from './ProductList';
import { Product } from './types';
import { useEffect, useState } from 'react';
import { fetchProducts, saveOrder } from './api';
import OrderLocation from './OrderLocation';
import { OrderLocationdata } from './types';
import OrderSummary from './OrderSummary';
import Footer from '../Footer';
import { checkIsSelected } from './helpers';
import { formatPrice } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Orders(){
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [orderLocation, setOrderLocation] = useState<OrderLocationdata>();
    const totalPrice = selectedProducts.reduce((sum, item)=>{
      return sum + item.price;
    },0);


    useEffect(() => {
      fetchProducts()
        .then(response => setProducts(response.data))
        .catch(error => console.log(error))  

    }, []);

    const handleSelectProduct = (product: Product) => {
      const isAlreadySelected = checkIsSelected(selectedProducts, product);
    
      if (isAlreadySelected) {
        const selected = selectedProducts.filter(item => item.id !== product.id);
        setSelectedProducts(selected);
      } else {
        setSelectedProducts(previous => [...previous, product]);
      }
    }

    const handleSubmit = () => {
      const productsIds = selectedProducts.map(({ id }) => ({ id }));
      const payload = {
        ...orderLocation!,
        products: productsIds
      }
    
      saveOrder(payload).then(() => {
        toast.error('Pedido enviado com sucesso!')
        setSelectedProducts([]);
      })
        .catch(() => {
          toast.warning('Erro ao enviar pedido');
        })
    }


    return (
      <>
       <div className="orders-container">
           <StepsHeader/>
           <ProductList 
           products={products}
           onSelectProduct={handleSelectProduct}
           selectedProducts={selectedProducts}
           />
           <OrderLocation onChangeLocation={Location => setOrderLocation(Location)}/>  
           <OrderSummary 
           amount={selectedProducts.length} 
           totalPrice={totalPrice}
           onSubmit={handleSubmit}/>         
       </div>
       <Footer/>
      </>

    )
}

export default Orders;

