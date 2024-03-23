import React from 'react';
import Button from 'react-bootstrap/Button';

const Logout = () => {
    function deleteCookie(cookieName) {
        document.cookie = `${cookieName}=; path=/;`;
        console.log('click');
    }

    const handleLogoutClick = () => {
        deleteCookie('Authorization');
    };

    return (
        <Button variant="primary" style={{marginRight:'4px'}} type="submit" onClick={handleLogoutClick}>
            Logout
        </Button>
    );
};

export default Logout;
