import halloween from './halloween';
import { services } from 'cauldronjs';
import moment from 'moment';

const holidays = [halloween()];

export default function holidaysService(server) {
  for (let holiday of holidays) {
    if (
      holiday.minDate.isSameOrBefore(moment.now()) &&
      holiday.maxDate.isAfter(moment.now())
    ) {
      console.log(`Today's holiday is: ${holiday.name}`);
      holiday.setup(server);
    }
  }
}
