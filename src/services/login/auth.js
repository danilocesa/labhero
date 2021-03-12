import { 
  LOGGEDIN_USER_DATA, 
  SELECTED_SIDER_KEY,
  ACCESS_MATRIX
} from 'global_config/constant-global';

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
    sessionStorage.setItem(SELECTED_SIDER_KEY, '1');
    sessionStorage.removeItem(ACCESS_MATRIX);
    window.location.reload();
	}
};

export default auth;