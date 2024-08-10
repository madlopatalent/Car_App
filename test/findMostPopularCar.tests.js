// test/findMostPopularCar.tests.js

import { expect } from 'chai';  // Import Chai's expect function
import findMostPopularCar from '../findMostPopularCar.js';  // Import the function to test

describe('findMostPopularCar', function() {
    it('should return the most popular car when there is a clear winner', function() {
        const cars = [
            { make: 'Toyota', model: 'Camry' },
            { make: 'Honda', model: 'Civic' },
            { make: 'Toyota', model: 'Camry' }
        ];
        const result = findMostPopularCar(cars);
        expect(result).to.deep.equal({
            makeAndModel: 'Toyota-Camry',
            count: 2
        });
    });

    it('should return the correct result when all cars are equally popular', function() {
        const cars = [
            { make: 'Toyota', model: 'Camry' },
            { make: 'Honda', model: 'Civic' },
            { make: 'Ford', model: 'Focus' }
        ];
        const result = findMostPopularCar(cars);
        expect(result).to.deep.equal({
            makeAndModel: 'Toyota-Camry',
            count: 1
        });
    });

    it('should handle an empty array', function() {
        const cars = [];
        const result = findMostPopularCar(cars);
        expect(result).to.deep.equal({
            makeAndModel: null,
            count: 0
        });
    });

    it('should handle a single car entry', function() {
        const cars = [
            { make: 'Toyota', model: 'Camry' }
        ];
        const result = findMostPopularCar(cars);
        expect(result).to.deep.equal({
            makeAndModel: 'Toyota-Camry',
            count: 1
        });
    });

    it('should handle multiple cars with the same make and model', function() {
        const cars = [
            { make: 'Toyota', model: 'Camry' },
            { make: 'Toyota', model: 'Camry' },
            { make: 'Toyota', model: 'Camry' }
        ];
        const result = findMostPopularCar(cars);
        expect(result).to.deep.equal({
            makeAndModel: 'Toyota-Camry',
            count: 3
        });
    });

    it('should return the correct most popular car when multiple cars have the same count', function() {
        const cars = [
            { make: 'Toyota', model: 'Camry' },
            { make: 'Honda', model: 'Civic' },
            { make: 'Toyota', model: 'Corolla' },
            { make: 'Honda', model: 'Accord' }
        ];
        const result = findMostPopularCar(cars);
        expect(result).to.deep.equal({
            makeAndModel: 'Toyota-Camry',
            count: 1
        });
    });
});
