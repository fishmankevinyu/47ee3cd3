import React, {useState, useEffect} from 'react';

const Footer = ({onActivity, screenSelected}) => {
    var selectBar;
    if (screenSelected == 0 || screenSelected == 1) {
        selectBar = <div className="selectbar"></div>
    }
    else {
        null
    }
    return <div className='footer container'>
        <div className='row footer-container'>
            <div className='col icon-container' onClick={onActivity}>
                {selectBar}
                <img className='icon' src="https://assets.stickpng.com/images/5a452601546ddca7e1fcbc87.png" alt="" />
            </div>
            <div className='col icon-container'>
                <img className='icon' src="https://cdn-icons-png.flaticon.com/512/5987/5987424.png" alt="" />
            </div>
            <div className='col icon-container'>
                <img className='icon' src="https://static-00.iconduck.com/assets.00/settings-icon-2048x2046-cw28eevx.png" alt="" />
            </div>
            <div className='col icon-container'>
                <img className='icon' src="https://cdn-icons-png.flaticon.com/512/481/481302.png" alt="" />
            </div>
        </div>
    </div>;
}

export default Footer;