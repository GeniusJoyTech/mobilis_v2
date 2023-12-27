const getAuthToken = () => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('Authorization=')) {
        return cookie.substring('Authorization='.length);
      }
    }
    return null;
  };

export default getAuthToken;