import PropTypes from 'prop-types';
import CustomMessage from '../message';

function HttpCodeMessage(param) {
	switch(param.status){
		case 204:// No content available
			CustomMessage.info(param.message || 'No results found!');
		break;
		case 201: // Created successfully
			CustomMessage.success({
				message: param.message || 'Successfully created!', 
				duration: param.duration, 
				onClose:param.onClose
			});
		break;
		case 200: // Success
			CustomMessage.success({
				message: param.message || 'Success!', 
				duration: param.duration, 
				onClose:param.onClose
			});
		break;
		default:
	}

}

HttpCodeMessage.propTypes = {
	status: PropTypes.number.isRequired
};


export default HttpCodeMessage;
  