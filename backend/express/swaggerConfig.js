const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mesh SaaS Backend Server API",
      version: "1.0.0",
      description: "API documentation for Mesh SaaS Backend Server",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
