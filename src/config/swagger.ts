import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AuthFy API",
      version: "1.0.0",
      description: "Authentication and Authorization System API",
      contact: {
        name: "Élcio Mateus Fernandes",
        email: "admin@authfy.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["name", "email", "username", "password"],
          properties: {
            id: {
              type: "string",
              description: "User unique identifier",
            },
            name: {
              type: "string",
              description: "User full name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            username: {
              type: "string",
              description: "User username",
            },
            phone: {
              type: "string",
              description: "User phone number",
            },
            isActive: {
              type: "boolean",
              description: "User active status",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "User creation date",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "User last update date",
            },
          },
        },
        CreateUserRequest: {
          type: "object",
          required: ["name", "email", "username", "password"],
          properties: {
            name: {
              type: "string",
              description: "User full name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            username: {
              type: "string",
              description: "User username",
            },
            password: {
              type: "string",
              minLength: 6,
              description: "User password",
            },
            phone: {
              type: "string",
              description: "User phone number",
            },
          },
        },
        ApiResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
            },
            message: {
              type: "string",
            },
            data: {
              type: "object",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const specs = swaggerJSDoc(options);
export { swaggerUi };
