import React from 'react';
import { mount, shallow, render } from 'enzyme';
import TextInput from '../TextInput'

it('should display the correct heading', () => {
  const wrapper = mount(
    <TextInput heading={'mockHeading'}/>
	);

	const actual = wrapper.find('Heading').text();
	const expected = 'mockHeading';

	expect(actual).toBe(expected);
});

it('should display the correct error string', () => {
  const wrapper = mount(
    <TextInput errors={'mockError'}/>
	);

	const actual = wrapper.find('p.error').text();
	const expected = 'mockError';

	expect(actual).toBe(expected);
});

it('should display the correct placeholder', () => {
  const wrapper = mount(
    <TextInput placeholder={'mockPlaceholder'}/>
	);

	const actual = wrapper.find('input').prop('placeholder');
	const expected = 'mockPlaceholder';

	expect(actual).toBe(expected);
});

it('should handle onChange event', () => {
	const mockCallBack = jest.fn();
  const wrapper = mount(
    <TextInput onChange={mockCallBack}/>
	);

	const button = wrapper.find('input');
	button.simulate('change', { target: { value: 'mockValue' } });

	expect(mockCallBack.mock.calls.length).toEqual(1);
});

it('should return value and name onChange', () => {
	const mockCallBack = jest.fn();
  const wrapper = mount(
    <TextInput onChange={mockCallBack} name={'mockName'}/>
	);

	const button = wrapper.find('input');
	button.simulate('change', { target: { value: 'mockValue' } });

	expect(mockCallBack.mock.calls[0]).toEqual(['mockName', 'mockValue']);
});

it('should display the correct value', () => {
  const wrapper = mount(
    <TextInput value={'mockValue'}/>
	);

	const actual = wrapper.find('input').prop('value');
	const expected = 'mockValue';

	expect(actual).toBe(expected);
});

it('should display an input of type password for name="password"', () => {
  const wrapper = mount(
    <TextInput name={'password'}/>
	);

	const actual = wrapper.find('input').prop('type');
	const expected = 'password';

	expect(actual).toBe(expected);
});

it('should have the correct classname', () => {
  const wrapper = mount(
    <TextInput/>
	);

	const actual = wrapper.find('.textInput').length;
	const expected = 1;

	expect(actual).toBe(expected);
});