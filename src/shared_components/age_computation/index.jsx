import moment from 'moment';

export default function computeAge(dateOfBirth){
    const formattedDate = moment(dateOfBirth, 'MM-DD-YYYY');
		const years = Math.floor(moment().diff(formattedDate, 'years', true));
		const age = years > 0 ? years : '---';

		return age;
}