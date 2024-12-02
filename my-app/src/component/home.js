import Header from './header';
import Footer  from './footer';
import Carousel from './carousel';
import Product from './productlist';
import About from './about';
function home (){
    return(
    <>
    <Carousel/>
    <Product/>
    <About/>
    </>        
    )
}
export default home
