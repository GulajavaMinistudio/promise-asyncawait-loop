import faker from 'faker';

function getRandomIntInclusive(min = 1, max = 10) {
    const mins = Math.ceil(min);
    const maxs = Math.floor(max);
    return Math.floor(Math.random() * (maxs - mins + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function generateRandomArrayData(count = 10) {
    const arrayData = [];
    for (let i = 0; i < count; i += 1) {
        arrayData.push({
            name: `${faker.name.firstName} ${faker.name.lastName}`,
            address: faker.address.streetAddress,
            email: faker.internet.email,
        });
    }

    return arrayData;
}

export { getRandomIntInclusive, generateRandomArrayData };
