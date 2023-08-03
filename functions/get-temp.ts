// Import the @netlify/functions module to access TypeScript typings
import { Handler } from '@netlify/functions';

// Import a database client library
import { Client } from 'pg';

// Define the handler function
const handler: Handler = async (event, context) => {
  // Create a new database client with the environment variable
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  // Connect to the database
  await client.connect();

  // Query the latest temperature data from the database
  const result = await client.query('SELECT temp FROM sensor_data ORDER BY time DESC LIMIT 1');

  // Disconnect from the database
  await client.end();

  // Return a response with the temperature data as JSON
  return {
    statusCode: 200,
    body: JSON.stringify({ temp: result.rows[0].temp }),
  };
};

// Export the handler function
export { handler };
