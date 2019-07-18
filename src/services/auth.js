import { LOGGEDIN_USER_DATA, SELECTED_SIDER_KEY } from 'shared_components/constant-global';

const auth = {
	isAuthenticated: !! sessionStorage.getItem(LOGGEDIN_USER_DATA),

  authenticate() {
    if(sessionStorage.getItem(LOGGEDIN_USER_DATA)){
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  },

  signout() {
    this.isAuthenticated = false;
    sessionStorage.removeItem(LOGGEDIN_USER_DATA);
    // sessionStorage.removeItem(SELECTED_SIDER_KEY);
    sessionStorage.setItem(SELECTED_SIDER_KEY, '1');
    window.location.reload();
  }
};

export default auth;