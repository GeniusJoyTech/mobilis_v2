import React from 'react';
import Button from 'react-bootstrap/Button';

const Logout = () => {
    function deleteCookie(cookieName) {
        document.cookie = `${cookieName}=; path=/;`;
    }

    const handleLogoutClick = () => {
        deleteCookie('Authorization');
    };

    return (
        <Button variant="primary" type="submit" onClick={handleLogoutClick}>
            Logout
        </Button>
    );
};

export default Logout;
