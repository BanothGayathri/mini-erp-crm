import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mini ERP CRM API",
      version: "1.0.0",
      description: "ERP CRM Backend API Documentation"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },

  apis: ["./src/routes/**/*.ts"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;