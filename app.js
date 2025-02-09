// Import Express
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');


// Initialize an Express application
const app = express();

// Define the port
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory (optional, as default is 'views')
app.set('views', path.join(__dirname, 'views'));

// Basic route
app.get('/dashboard', (req, res) => {
    res.render('employer-dashboard.ejs');
});
app.get('/empdashboard', (req, res) => {
    // Read the jobs.json file
    fs.readFile(path.join(__dirname, 'jobs.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading the jobs data');
        }

        // Parse the JSON data
        const jobs = JSON.parse(data);

        // Render the worker-dashboard.ejs template and pass the jobs data
        res.render('worker-dashboard', { jobs });
    });
});
app.get('/index', (req, res) => {
    res.render('index.ejs');
});

app.post('/submit-job', (req, res) => {
    const jobData = {
        jobTitle: req.body['job-title'],
        jobDescription: req.body['job-description'],
        jobLocation: req.body['job-location'],
        latitude: req.body['latitude'],
        longitude: req.body['longitude']
    };

    // Append the job data to a file
    fs.readFile('jobs.json', (err, data) => {
        if (err) {
            // If file doesn't exist, create it
            const initialData = [];
            initialData.push(jobData);
            fs.writeFile('jobs.json', JSON.stringify(initialData, null, 2), (err) => {
                if (err) throw err;
                res.send('Job has been posted!');
            });
        } else {
            const existingData = JSON.parse(data);
            existingData.push(jobData);
            fs.writeFile('jobs.json', JSON.stringify(existingData, null, 2), (err) => {
                if (err) throw err;
                res.redirect("/dashboard")
            });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
