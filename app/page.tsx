import './main_menu.css';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="menu">
        <div className="menu_items">
            <Link className="menu_item" href='/shop'>Shop</Link>
            <Link className="menu_item" href='/about'>About Us</Link>
            <Link className="menu_item" href='/customer_support'>Contact Us</Link>
        </div>
        <div id="bg_pattern"></div>
        <div id="bg_image"></div> 
    </div>
  );
}