import { render, screen } from '../../../test-utils/testing-library-utils.js';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry.jsx';

test('update scoop subtotal when scoops change', async () => {
    render(<Options optionType="scoops" />);

    // make sure totalm starts out $0.00

    const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
    expect(scoopsSubtotal).toHaveTextContent('0.00');

    // update vanilla scoops to 1 and check the subtotal

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(scoopsSubtotal).toHaveTextContent('2.00');

    // // update chocolate scoops to 2 and check subtotal

    // const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });
    
    // userEvent.clear(chocolateInput);
    // userEvent.type(chocolateInput, 2);
    // expect(scoopsSubtotal).toHaveTextContent('6.00');

})

test('update toppings subtotal when toppings change', async () => {
    // render parent component

    render(<Options optionType="toppings" />);

    // make sure total starts out at $0.00
    const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false });
    expect(toppingsSubtotal).toHaveTextContent('0.00');

    // add cherries and check subtotal
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: 'Cherries' });
    userEvent.click(cherriesCheckbox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');

    // add hot fudge and check subtotal
    const hotFudgeCheckBox = await screen.findByRole('checkbox', { name: 'Hot fudge' });
    userEvent.click(hotFudgeCheckBox);
    expect(toppingsSubtotal).toHaveTextContent('3.00');

    // remove hot fudge and check subtotal
    userEvent.click(hotFudgeCheckBox);
    expect(toppingsSubtotal).toHaveTextContent('1.50');
})

describe('grand total', () => {

    test('grand total updates properly if scoop is added first', async () => {
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });

        // check that the grand total starts out at 0.00

        expect(grandTotal).toHaveTextContent('0.00');

        // Update vaninall scoop
        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2');

        // Make sure grand total is updated
        expect(grandTotal).toHaveTextContent('4.00');
    });

    test('grand total updates properly if topping is added first', async () => {
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });

        // Add a hot fudge topping
        const hotFudgeCheckBox = await screen.findByRole('checkbox', { name: 'Hot fudge' });
        userEvent.click(hotFudgeCheckBox);

        // Make sure grand total is updated
        expect(grandTotal).toHaveTextContent('1.50');
    });

    test('grand total updates properly if item is removed', async () => {
        render(<OrderEntry />);
        const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i });

        // Add two vanilla scoops
        const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '2'); // grand total: 4.00

        // Add one hot fudge
        const hotFudgeCheckBox = await screen.findByRole('checkbox', { name: 'Hot fudge' });
        userEvent.click(hotFudgeCheckBox); // grand total: 5.50

        // Remove the hot fudge and one vanilla scoop
        userEvent.clear(vanillaInput);
        userEvent.type(vanillaInput, '1');

        userEvent.click(hotFudgeCheckBox);

        // Make sure grand total is correct
        expect(grandTotal).toHaveTextContent('2.00');
    });
})