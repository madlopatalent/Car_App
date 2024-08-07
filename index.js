import express from 'express';
import cors from 'cors'
import axios from 'axios';
const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(express.static("public"))

//app of popular car in stellen
function findMostPopularCar(cars) {
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
let carData = [
    {
        "color": "white",
        "make": "Volkswagen",
        "model": "Polo",
        "reg_number": "CL 61045"
    },
    {
        "color": "red",
        "make": "Toyota",
        "model": "Tazz",
        "reg_number": "CY 16875"
    },
    {
        "color": "orange",
        "make": "Nissan",
        "model": "Juke",
        "reg_number": "CK 32655"
    },
    {
        "color": "orange",
        "make": "Ford",
        "model": "EcoSport",
        "reg_number": "CL 11318"
    },
    {
        "color": "white",
        "make": "Nissan",
        "model": "Micra",
        "reg_number": "CJ 16103"
    },
    {
        "color": "orange",
        "make": "Nissan",
        "model": "Juke",
        "reg_number": "CL 42789"
    },
    {
        "color": "blue",
        "make": "Volkswagen",
        "model": "Jetta",
        "reg_number": "CA 46977"
    },
    {
        "color": "white",
        "make": "Volkswagen",
        "model": "Polo",
        "reg_number": "CY 25661"
    },
    {
        "color": "white",
        "make": "Nissan",
        "model": "Micra",
        "reg_number": "CY 35475"
    },
    {
        "color": "white",
        "make": "Toyota",
        "model": "Corolla",
        "reg_number": "CY 54886"
    },
    {
        "color": "white",
        "make": "Toyota",
        "model": "Hilux",
        "reg_number": "CJ 16455"
    },
    {
        "color": "orange",
        "make": "Toyota",
        "model": "Corolla",
        "reg_number": "CK 57166"
    },
    {
        "color": "orange",
        "make": "Ford",
        "model": "Fiesta",
        "reg_number": "CL 77790"
    },
    {
        "color": "blue",
        "make": "Nissan",
        "model": "Juke",
        "reg_number": "CY 98904"
    },
    {
        "color": "white",
        "make": "Ford",
        "model": "Ranger",
        "reg_number": "CF 75599"
    },
    {
        "color": "red",
        "make": "Toyota",
        "model": "Corolla",
        "reg_number": "CA 5510"
    },
    {
        "color": "blue",
        "make": "Ford",
        "model": "Focus",
        "reg_number": "CF 75586"
    },
    {
        "color": "orange",
        "make": "Toyota",
        "model": "Tazz",
        "reg_number": "CA 46137"
    },
    {
        "color": "orange",
        "make": "Ford",
        "model": "Ranger",
        "reg_number": "CK 22692"
    },
    {
        "color": "red",
        "make": "Toyota",
        "model": "Corolla",
        "reg_number": "CF 33543"
    },
    {
        "color": "red",
        "make": "Volkswagen",
        "model": "Touran",
        "reg_number": "CA 94890"
    },
    {
        "color": "orange",
        "make": "Toyota",
        "model": "Tazz",
        "reg_number": "CY 82252"
    },
    {
        "color": "blue",
        "make": "Toyota",
        "model": "Yaris",
        "reg_number": "CL 9538"
    },
    {
        "color": "white",
        "make": "Nissan",
        "model": "Juke",
        "reg_number": "CF 62002"
    },
    {
        "color": "orange",
        "make": "Ford",
        "model": "Fiesta",
        "reg_number": "CJ 67577"
    },
    {
        "color": "blue",
        "make": "Ford",
        "model": "Ranger",
        "reg_number": "CA 77852"
    },
    {
        "color": "orange",
        "make": "Toyota",
        "model": "Hilux",
        "reg_number": "CY 52435"
    },
    {
        "color": "blue",
        "make": "Toyota",
        "model": "Corolla",
        "reg_number": "CL 76173"
    },
    {
        "color": "red",
        "make": "Toyota",
        "model": "Tazz",
        "reg_number": "CL 38315"
    },
    {
        "color": "orange",
        "make": "Toyota",
        "model": "Corolla",
        "reg_number": "CK 41166"
    }
]
// Endpoint to get the most popular car
app.get('/api/most-popular-cars', (req, res) => {
    const mostPopularCar = findMostPopularCar(carData);
    res.json(mostPopularCar);
});
app.post('/api/cars', (req, res) => {
    const newCar = req.body;

    // Validate the incoming data (e.g., check if required fields are present)
    if (!newCar.model || !newCar.make || !newCar.color || !newCar.reg_number) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Add the new car to the array
    carData.push(newCar)
    console.log(carData.length)
    // Send a response confirming the addition
    res.status(201).json({ message: 'Car added successfully', car: newCar });
});
// Endpoint to remove a car by registration number
app.delete('/api/cars/:reg_number', (req, res) => {
    const regNumber = req.params.reg_number;
    const initialLength = carData.length;
    carData = carData.filter(car => car.reg_number !== regNumber);

    if (carData.length === initialLength) {
        return res.status(404).json({ error: 'Car not found' });
    }

    res.status(200).json({ message: 'Car removed successfully' });
});

app.put('/api/cars/:reg_number', (req, res) => {
    const regNumber = req.params.reg_number;
    const updatedCar = req.body;

    // Validate the incoming data
    if (!updatedCar.make || !updatedCar.model || !updatedCar.color) {
        return res.status(400).json({ error: 'Make, model, and color are required fields' });
    }

    // Find the car to update
    const carIndex = carData.findIndex(car => car.reg_number === regNumber);

    if (carIndex === -1) {
        return res.status(404).json({ error: 'Car not found' });
    }

    // Update the car details
    carData[carIndex] = { ...carData[carIndex], ...updatedCar };

    res.status(200).json({ message: 'Car updated successfully', car: carData[carIndex] });
});

app.listen(3005, function(){
    console.log('App starting on port', 3005);
  });

