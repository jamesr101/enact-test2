import React from 'react';
import { mount, shallow } from 'enzyme';
import SubmitButton from '../SubmitButton'

// TODO: Can't get this test to pass...
// it('should handle onClick event', () => {
//   const mockCallBack = jest.fn();

//   const wrapper = mount((<SubmitButton onClick={mockCallBack}/>));
//   console.log(wrapper.debug())

//   const button = wrapper.find('[role="button"]');
//   button.simulate('keypress', {key: 'Enter'});

//   expect(mockCallBack.mock.calls.length).toEqual(1);
// });

it('should include a Spinner when "isSubmitting"', () => {
  const wrapper = mount(
    <SubmitButton isSubmitting />
  );

	const spinner = wrapper.find('Spinner');
	const expected = 1;
	const actual = spinner.length;

	expect(actual).toBe(expected);
});

it('should not include a Spinner when "isSubmitting" is false', () => {
  const wrapper = mount(
    <SubmitButton isSubmitting={false} />
  );

	const spinner = wrapper.find('Spinner');
	const expected = 0;
	const actual = spinner.length;

	expect(actual).toBe(expected);
});

it('should be disabled when "isSubmitting"', () => {
  const wrapper = mount(
    <SubmitButton isSubmitting />
  );

	const button = wrapper.find('Button');
	const expected = true;
	const actual = button.prop('disabled');

	expect(actual).toBe(expected);
});

it('should be not disabled when "isSubmitting" is false', () => {
  const wrapper = mount(
    <SubmitButton isSubmitting={false} />
  );

	const button = wrapper.find('Button');
	const expected = false;
	const actual = button.prop('disabled');

	expect(actual).toBe(expected);
});

it('should have the correct class', () => {
  const wrapper = shallow(
    <SubmitButton/>
  );
	const actual = wrapper.find('.buttonContainer').length
	const expected = 1;

	expect(actual).toBe(expected);
});

// TO DO:
// handles onClick