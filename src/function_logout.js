class LogoutService {
    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('sub');
        localStorage.removeItem('role');
        localStorage.removeItem('nome');
        window.location.href = '/'; 
    }
}

export default LogoutService;