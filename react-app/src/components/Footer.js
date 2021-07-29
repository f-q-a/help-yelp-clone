import React from 'react';
import './styles/footer.css';


const Footer = () => {
    return (
        <div className='footer'>
            <a className='image' href='https://www.linkedin.com/in/felipe-q-araujo/' target="_blank">
                <i className="devicon-linkedin-plain"></i>
            </a>
            <a className='image' href='https://github.com/f-q-a/' target="_blank">
            <i className="devicon-github-original"></i>
            </a>
        </div>
    );
}

export default Footer;
