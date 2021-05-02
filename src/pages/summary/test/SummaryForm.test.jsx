import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SummaryForm from '../SummaryForm';


describe('SummaryForm component tests', () => {
    let checkboxElement;
    let confirmButtonElement;

    beforeEach(() => {
        render(<SummaryForm />);
        checkboxElement = screen.getByRole('checkbox', {name: /i agree to terms and conditions/i});
        confirmButtonElement = screen.getByRole('button', {name: /confirm order/i});
    })

    test("checkbox is unchecked by default", () => {
        expect(checkboxElement).not.toBeChecked();
    })
    
    test("checkbox enables and disables the button", () => {
       // Simulate a click on checkbox and expect it to be cheecked
        userEvent.click(checkboxElement);
        expect(checkboxElement).toBeChecked();
        
        // Expect the button to be active after this
        expect(confirmButtonElement).toBeEnabled();

        // Simulate another click and expect checkbox to unchecked
        userEvent.click(checkboxElement);
        expect(checkboxElement).not.toBeChecked();

        //Expect button to be disabled after this
        expect(confirmButtonElement).toBeDisabled();
    })

    test("popvoer response to hover", () => {
        // popover starts out hidden

        // popover appears upon mouseover of checkbox label

        // popopver disappears when we mouse out
    })
})

