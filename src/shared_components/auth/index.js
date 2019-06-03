const checkAuth = {
	isAuthenticated: !!sessionStorage.getItem("userData"),

  authenticate() {
    if(sessionStorage.getItem("userData")){
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  },

  signout() {
    this.isAuthenticated = false;
    sessionStorage.clear();
  }
};

export default checkAuth;