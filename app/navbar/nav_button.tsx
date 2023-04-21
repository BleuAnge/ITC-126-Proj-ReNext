import './navbar.css';

export default function NavButton({ content }: any) {    

    return (
        <li className='nav_item'>
            <a href={content.url} className='title_btn'>
                {content.title}
            </a>
        </li>
    )
}