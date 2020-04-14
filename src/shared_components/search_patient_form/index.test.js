import React from 'react';
import renderer from 'react-test-renderer';
import SearchPatientForm from './index';

it('render correctly text component', () => {  
  const TextInputComponent = renderer.create(<SearchPatientForm />).toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});