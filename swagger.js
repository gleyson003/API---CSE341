const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CSE341 - API",
      version: "1.0.0",
      description: "API documentation in the CSE341 course",
    },
    servers: [
      {
        url: "https://cse341-api-service.onrender.com",
      },
      {
        url: "http://localhost:3000/",
      },
    ],
    components: {
      securitySchemes: {
        Bearer: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Token JWT is necessary."
        }
      }
    },
    security: [{ Bearer: [] }]
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
