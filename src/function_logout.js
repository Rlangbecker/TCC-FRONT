class LogoutService {
    static logout() {
        localStorage.removeItem('token');
        window.location.href = '/'; 
    }
}

export default LogoutService;