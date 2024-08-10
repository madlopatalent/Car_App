// findMostPopularCar.js
export default function findMostPopularCar(cars) {
    const carPopularity = {};

    cars.forEach(car => {
        const key = `${car.make}-${car.model}`;
        carPopularity[key] = (carPopularity[key] || 0) + 1;
    });

    const mostPopularCar = Object.entries(carPopularity).reduce(
        (max, car) => car[1] > max[1] ? car : max,
        [null, 0]
    );

    return {
        makeAndModel: mostPopularCar[0],
        count: mostPopularCar[1]
    };
}
