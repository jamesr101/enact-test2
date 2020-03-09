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

it('should have the correct method onSelect', () => {
	const mockCallback = jest.fn()
	const event = {
		data: 'eventData'
	}
  const wrapper = shallow(
    <SelectInput onSelect={mockCallback}/>
	);

	wrapper.instance().handlers.onSelect(event)
	expect(mockCallback.mock.calls.length).toBe(1)
});

it('should call the onSelect method with the correct parameters', () => {
	const mockCallback = jest.fn()
	const event = {
		data: 'eventData'
	}
  const wrapper = shallow(
    <SelectInput onSelect={mockCallback} name={'mockName'}/>
	);

	wrapper.instance().handlers.onSelect(event)
	expect(mockCallback).toHaveBeenCalledWith('mockName', 'eventData')
});