import React from 'react';
import Button from 'react-bootstrap/Button';
import refreshTime from '../utils/refreshTime';

const Logout = () => {
    function deleteCookie(cookieName) {
        document.cookie = `${cookieName}=; path=/;`;
    }

    const handleLogoutClick = () => {
        deleteCookie('Authorization');
        refreshTime();
    };

    return (
        <Button variant="primary" type="submit" onClick={handleLogoutClick}>
            Logout
        </Button>
    );
};

export default Logout;
