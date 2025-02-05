import React from 'react';
import cls from './Footer.module.css'


const Footer = () => {
    return (
        <footer className="bg_color">
            <div>
                <p>Created by NiKaSoD</p>
            </div>

            <div className={cls.social}>
                <a href="https://discordapp.com/users/715952660263600169" className="fa-brands fa-discord" target="_blank"></a>
                <a href="https://t.me/NiKaSoD" className="fa-brands fa-telegram" target="_blank"></a>
            </div>
        </footer>
    );
};

export default Footer;