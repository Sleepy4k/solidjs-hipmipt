function getCookie(key: string = 'token') {
  const cookie = document.cookie.split('; ').find(cookie => cookie.startsWith(key + '='));

  return cookie ? cookie : null;
}

export { getCookie };
