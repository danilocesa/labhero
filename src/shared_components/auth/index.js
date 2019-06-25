const checkAuth = {
	isAuthenticated: !! sessionStorage.getItem("userData"),

  authenticate() {
    if(sessionStorage.getItem("userData")){
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  },

  signout() {
    this.isAuthenticated = false;
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("currentKey");
    // window.location.reload();
  }
};

export default checkAuth;