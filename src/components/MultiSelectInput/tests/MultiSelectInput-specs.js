import React from 'react';
import { mount, shallow, render } from 'enzyme';
import MultiSelectInput from '../MultiSelectInput'

it('should display the correct heading', () => {
  const wrapper = mount(
    <MultiSelectInput heading={'mockHeading'}/>
	);

	const actual = wrapper.find('Heading').text();
	const expected = 'mockHeading';

	expect(actual).toBe(expected);
});

it('should display the correct error string', () => {
  const wrapper = mount(
    <MultiSelectInput errors={'mockError'}/>
	);

	const actual = wrapper.find('p.error').text();
	const expected = 'mockError';

	expect(actual).toBe(expected);
});

it('should have the correct classname', () => {
  const wrapper = mount(
    <MultiSelectInput/>
	);

	const actual = wrapper.find('.multiSelectInput').length;
	const expected = 1;

	expect(actual).toBe(expected);
});

it('should have the correct method onSelect', () => {
	const mockCallback = jest.fn()
	const event = {
		data: 'eventData'
	}
  const wrapper = shallow(
    <MultiSelectInput onSelect={mockCallback}/>
	);

	wrapper.instance().handlers.onSelect(event)
	expect(mockCallback.mock.calls.length).toBe(1)
});

it('should call the onSelect method with the correct parameters when a "new" option is selected', () => {
	const mockCallback = jest.fn()
	const event = {
		data: 'option2'
	}
  const wrapper = shallow(
    <MultiSelectInput onSelect={mockCallback} name={'mockName'} value={['option1']}/>
	);

	wrapper.instance().handlers.onSelect(event)
	expect(mockCallback).toHaveBeenCalledWith('mockName', ['option1', 'option2'])
});

it('should call the onSelect method with the correct parameters when an "already selected" option is selected', () => {
	const mockCallback = jest.fn()
	const event = {
		data: 'option2'
	}
  const wrapper = shallow(
    <MultiSelectInput onSelect={mockCallback} name={'mockName'} value={['option1', 'option2', 'option3']}/>
	);

	wrapper.instance().handlers.onSelect(event)
	expect(mockCallback).toHaveBeenCalledWith('mockName', ['option1', 'option3'])
});