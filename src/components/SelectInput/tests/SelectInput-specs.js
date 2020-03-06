import React from 'react';
import { mount, shallow, render } from 'enzyme';
import SelectInput from '../SelectInput'

it('should display the correct heading', () => {
  const wrapper = mount(
    <SelectInput heading={'mockHeading'}/>
	);

	const actual = wrapper.find('Heading').text();
	const expected = 'mockHeading';

	expect(actual).toBe(expected);
});

it('should display the correct error string', () => {
  const wrapper = mount(
    <SelectInput errors={'mockError'}/>
	);

	const actual = wrapper.find('p.error').text();
	const expected = 'mockError';

	expect(actual).toBe(expected);
});

it('should have the correct classname', () => {
  const wrapper = mount(
    <SelectInput/>
	);

	const actual = wrapper.find('.selectInput').length;
	const expected = 1;

	expect(actual).toBe(expected);
});