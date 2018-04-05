import { notification } from 'antd';
import { getFieldValues } from '../../utils';

export function handleFormSubmit(e) {
  e.preventDefault();

  this.props.form.validateFields((err, values) => {
    if (!err) {
      this.props.login(getFieldValues(values));
    } else {
      notification.error({ message: 'Email and password are required.' });
    }
  });
}
