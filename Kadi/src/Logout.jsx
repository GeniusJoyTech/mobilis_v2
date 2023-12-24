function deleteCookie(cookieName) {
    document.cookie = `${cookieName}=; path=/;`;
}