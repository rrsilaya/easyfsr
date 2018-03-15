import { getFieldValues } from '../../utils';

export function handleFormSubmit(e) {
  e.preventDefault();

  this.props.form.validateFields((err, values) => {
    if (!err) {
      console.log(getFieldValues(values));
      this.props.login(getFieldValues(values));
    }
  });
}
