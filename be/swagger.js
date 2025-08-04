import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
    },
    tags: [
      { name: "Auth", description: "Autentikasi user" },
      { name: "Users", description: "Manajemen anggota AFR (admin only)" },
      { name: "Fraud Categories", description: "Kategori fraud" },
      { name: "Fraud Names", description: "Nama-nama fraud" },
    ],
  },
  apis: ["./routes/*.js"], // semua file route di sini
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
