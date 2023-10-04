class LogoutService {
    static logout() {
        localStorage.clear();
        window.location.href = '/'; 
    }
}

export default LogoutService;