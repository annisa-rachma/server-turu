const request = require("supertest");
const { describe, it, expect } = require("@jest/globals");
const app = require("../app");
const { sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");

let access_token;

beforeAll(async () => {
  const dataUser = require("../data/user.json").map((el) => {
    el.password = hashPassword(el.password);
    el.createdAt = new Date();
    el.updatedAt = new Date();
    return el;
  });

  const dataType = require("../data/type.json").map((el) => {
    el.createdAt = new Date();
    el.updatedAt = new Date();
    return el;
  });

  const dataLodging = require("../data/lodging.json").map((el) => {
    el.createdAt = new Date();
    el.updatedAt = new Date();
    el.status = "Active";
    return el;
  });
  const customerData = [
    {
      email: "cust1@mail.com",
      password: hashPassword("123456"),
      role: "customer",
      imageUrl: "https://source.boringavatars.com/beam/120/?square",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const dataBookmark = [
    {
      LodgingId: 1,
      CustomerId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      LodgingId: 2,
      CustomerId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      LodgingId: 3,
      CustomerId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  await sequelize.queryInterface.bulkInsert("Users", dataUser);
  await sequelize.queryInterface.bulkInsert("Types", dataType);
  await sequelize.queryInterface.bulkInsert("Lodgings", dataLodging);
  await sequelize.queryInterface.bulkInsert("Customers", customerData);
  await sequelize.queryInterface.bulkInsert("Bookmarks", dataBookmark);
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Customers", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await sequelize.queryInterface.bulkDelete("Bookmarks", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await sequelize.queryInterface.bulkDelete("Lodgings", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await sequelize.queryInterface.bulkDelete("Customers", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await sequelize.queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await sequelize.queryInterface.bulkDelete("Types", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("Register - POST/pub/register", () => {
  it("should respond 201 successfully registered - create new customer", async () => {
    const response = await request(app)
      .post("/pub/register")
      .send({ email: "test@mail.com", password: "123456" });

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("message", "succesfully registered");
  });

  it("should respond 400 - invalid email format", async () => {
    const response = await request(app)
      .post("/pub/register")
      .send({ email: "test.mail", password: "123456" });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("message", "Invalid email format");
  });

  it("should respond 400 - Email is required", async () => {
    const response = await request(app)
      .post("/pub/register")
      .send({ password: "123456" });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  it("should respond 400 - Email already registered", async () => {
    const response = await request(app)
      .post("/pub/register")
      .send({ email: "test@mail.com", password: "123456" });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("message", "Email already registered");
  });

  it("should respond 400 - Password is required", async () => {
    const response = await request(app)
      .post("/pub/register")
      .send({ email: "test@mail.com" });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  it("should respond 400 - minimum password length is 5 character", async () => {
    const response = await request(app)
      .post("/pub/register")
      .send({ email: "test@mail.com", password: "1" });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty(
      "message",
      "minimum password length is 5 character"
    );
  });
});

describe("Login - POST/pub/login", () => {
  it("should respond 200 - return object", async () => {
    const response = await request(app)
      .post("/pub/login")
      .send({ email: "test@mail.com", password: "123456" });

    access_token = signToken({ id: response.body.id });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("email", expect.any(String));
    expect(response.body).toHaveProperty("imageUrl", expect.any(String));
  });

  it("should respond 400 - Email or Password cannot empty", async () => {
    const response = await request(app)
      .post("/pub/login")
      .send({ email: "test@mail.com" });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty(
      "message",
      "Email or Password cannot empty"
    );
  });

  it("should respond 400 - Email or Password cannot empty", async () => {
    const response = await request(app)
      .post("/pub/login")
      .send({ password: "123456" });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty(
      "message",
      "Email or Password cannot empty"
    );
  });

  it("should respond 401 - return Invalid email or password", async () => {
    const response = await request(app)
      .post("/pub/login")
      .send({ email: "tes@mail.com", password: "123456" });

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid email or password"
    );
  });

  it("should respond 401 - return Invalid email or password", async () => {
    const response = await request(app)
      .post("/pub/login")
      .send({ email: "test@mail.com", password: "1234" });

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty(
      "message",
      "Invalid email or password"
    );
  });
});

describe("Get all lodgings - GET/pub/lodgings", () => {
  it("should respond 200 - return an object", async () => {
    const response = await request(app).get("/pub/lodgings");

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("total", expect.any(Number));
    expect(response.body).toHaveProperty("lodging", expect.any(Array));
  });

  it("should respond 200 - return an object with filtered array", async () => {
    const response = await request(app).get("/pub/lodgings?search=yogya");

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("total", expect.any(Number));
    expect(response.body).toHaveProperty("lodging", expect.any(Array));
  });

  it("should respond 200 - return an object with total equal to 8", async () => {
    const response = await request(app).get(
      "/pub/lodgings?page[size]=8&page[number]=1"
    );

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("total", 8);
    expect(response.body).toHaveProperty("lodging", expect.any(Array));
  });
});

describe("Get lodging by id - GET/pub/lodgings/:id", () => {
  it("should respond 200 - return an object", async () => {
    const response = await request(app).get("/pub/lodgings/1");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(expect.any(Object));
    expect(response.body).toHaveProperty("qr", expect.any(String));
  });

  it("should respond 404 - return Lodging not found", async () => {
    const response = await request(app).get("/pub/lodgings/50");

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message", "Lodging not found");
  });
});

describe("Get all bookmarks - GET/pub/bookmarks", () => {
  it("should respond 200 - return an array of object", async () => {
    const response = await request(app)
      .get("/pub/bookmarks")
      .set("access_token", access_token);

    expect(response.status).toEqual(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("Add bookmarks - POST/pub/bookmarks/:LodgingId", () => {
  it("should respond 201 - return an object", async () => {
    const response = await request(app)
      .post("/pub/bookmarks/9")
      .set("access_token", access_token);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("CustomerId", expect.any(Number));
    expect(response.body).toHaveProperty("LodgingId", expect.any(Number));
  });

  it("should respond 400 - return Lodging already bookmarked", async () => {
    const response = await request(app)
      .post("/pub/bookmarks/9")
      .set("access_token", access_token);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty(
      "message",
      "Lodging already bookmarked"
    );
  });

  it("should respond 404 - return Lodging not found", async () => {
    const response = await request(app)
      .post("/pub/bookmarks/90")
      .set("access_token", access_token);

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty("message", "Lodging not found");
  });

  it("should respond 401 - Return 'Invalid Token' because the customer has not been logged in", async () => {
    const response = await request(app).post("/pub/bookmarks");

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("should respond 401 - return Invalid Token", async () => {
    const response = await request(app)
      .post("/pub/bookmarks")
      .set("access_token", "asiand");

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });
});
