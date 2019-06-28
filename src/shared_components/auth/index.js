const checkAuth = {
	isAuthenticated: !! sessionStorage.getItem("LOGGEDIN_USER_DATA"),

  authenticate() {
    if(sessionStorage.getItem("LOGGEDIN_USER_DATA")){
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  },

  signout() {
    window.location.reload();
    this.isAuthenticated = false;
    sessionStorage.removeItem("LOGGEDIN_USER_DATA");
    sessionStorage.removeItem("SELECTED_SIDER_KEY");
  }
};

export default checkAuth;