import { findAllByRole, render, screen } from '@testing-library/react';

import Options from '../Options';

test('It displays image for each scoop option from server', async () => {
    render(<Options optionType="scoops"/>);

    // find images
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i});
    expect(scoopImages).toHaveLength(2);

    // confirm all text of images
    const altText = scoopImages.map(element => element.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('It displays image for each topping option from server', async () => {
    render(<Options optionType="toppings"/>);

    //find images
    const toppingsImages = await screen.findAllByRole('img', { name: /topping$/i});
    expect(toppingsImages).toHaveLength(3);

    // confirm alt text of images
    const altText = toppingsImages.map(el => el.alt);
    expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
})