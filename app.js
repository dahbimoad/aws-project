const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const moment = require('moment-timezone');

const app = express();
const port = process.env.PORT || 3000;

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Regional Time API',
      version: '1.0.0',
      description: 'An API that returns the current time for a selected region',
    },
  },
  apis: ['./app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/time/{region}:
 *   get:
 *     summary: Returns the current time for a specified region
 *     parameters:
 *       - in: path
 *         name: region
 *         schema:
 *           type: string
 *         required: true
 *         description: The timezone region (e.g., America/New_York, Europe/London, Africa/Casablanca)
 *     responses:
 *       200:
 *         description: Current time in the specified region
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 region:
 *                   type: string
 *                   example: Africa/Casablanca
 *                 time:
 *                   type: string
 *                   example: 2025-04-19T15:30:00+01:00
 *                 formattedTime:
 *                   type: string
 *                   example: April 19, 2025 3:30 PM
 *       400:
 *         description: Invalid region
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid region. Use /api/regions to see available regions.
 */
app.get('/api/time/:region', (req, res) => {
  const region = req.params.region;
  
  // Check if the region is valid
  if (!moment.tz.zone(region)) {
    return res.status(400).json({ 
      error: 'Invalid region. Use /api/regions to see available regions.' 
    });
  }
  
  const currentTime = moment.tz(region);
  
  res.json({
    region: region,
    time: currentTime.format(),
    formattedTime: currentTime.format('MMMM D, YYYY h:mm A')
  });
});

/**
 * @swagger
 * /api/regions:
 *   get:
 *     summary: Returns a list of available timezone regions
 *     responses:
 *       200:
 *         description: List of available regions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 regions:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Africa/Casablanca", "Africa/Cairo", "Europe/London", "Asia/Tokyo"]
 */
app.get('/api/regions', (req, res) => {
  // Get all timezone names
  const regions = moment.tz.names();
  
  // Extended list of common regions including more African regions
  const commonRegions = [
    // Africa
    'Africa/Casablanca',   // Morocco
    'Africa/Lagos',        // Nigeria
    'Africa/Cairo',        // Egypt
    'Africa/Johannesburg', // South Africa
    'Africa/Nairobi',      // Kenya
    'Africa/Accra',        // Ghana
    'Africa/Algiers',      // Algeria
    'Africa/Tunis',        // Tunisia
    'Africa/Tripoli',      // Libya
    'Africa/Khartoum',     // Sudan
    'Africa/Addis_Ababa',  // Ethiopia
    'Africa/Djibouti',     // Djibouti
    'Africa/Dakar',        // Senegal
    
    // Americas
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'America/Toronto',
    'America/Mexico_City',
    'America/Bogota',
    'America/Sao_Paulo',
    'America/Buenos_Aires',
    
    // Europe
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/Madrid',
    'Europe/Rome',
    'Europe/Moscow',
    'Europe/Istanbul',
    
    // Asia
    'Asia/Tokyo',
    'Asia/Dubai',
    'Asia/Singapore',
    'Asia/Shanghai',
    'Asia/Kolkata',     // India
    'Asia/Hong_Kong',
    'Asia/Seoul',
    'Asia/Baghdad',
    'Asia/Bangkok',
    
    // Oceania
    'Australia/Sydney',
    'Australia/Perth',
    'Pacific/Auckland'
  ];
  
  res.json({
    regions: commonRegions,
    // Uncomment below to return all regions (there are many)
    // allRegions: regions
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});