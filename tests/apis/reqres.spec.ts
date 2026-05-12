import { test, expect, request } from "@playwright/test";

test.describe("Reqres API", () => {
  test.describe("Get USuarios", () => {
    test("GET lista de usuarios", async ({ request }) => {
      const response = await request.get("/api/users?page=2");

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.page).toBe(2);
      expect(body.data).toHaveLength(6);
      expect(body.data[0].email).toBe("michael.lawson@reqres.in");
    });

    test("GET usuario especifico", async ({ request }) => {
      const response = await request.get("/api/users/2");

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.data).toMatchObject({
        id: 2,
        email: "janet.weaver@reqres.in",
        first_name: "Janet",
        last_name: "Weaver",
      });
    });

    test("GET usuario que no existe", async ({ request }) => {
      const response = await request.get("/api/users/999");

      expect(response.status()).toBe(404);
    });
  });
  test.describe("POST,PUT,DELETE", () => {
    test("POST crear usuario", async ({ request }) => {
      const response = await request.post("https://reqres.in/api/users", {
        data: {
          name: "Gre",
          job: "QA Automation Engineer",
        },
      });

      expect(response.status()).toBe(201);

      const body = await response.json();
      expect(body.name).toBe("Gre");
      expect(body.job).toBe("QA Automation Engineer");
      expect(body.id).toBeTruthy();
    });

    test("PUT modificar usuario", async ({ request }) => {
      const response = await request.put("/api/users/2", {
        data: {
          name: "Gretchel",
          job: "Software Engineer",
        },
      });

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.name).toBe("Gretchel");
      expect(body.job).toBe("Software Engineer");
    });

    test("DELETE eliminar usuario", async ({ request }) => {
      const response = await request.delete("https://reqres.in/api/users/3");

      expect(response.status()).toBe(204);
    });
  });
});

test.describe("Authentication", () => {
  test("POST login y obtener token", async ({ request }) => {
    const response = await request.post("/api/login", {
      data: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);
    expect(body.token).toBeTruthy();
  });

  test("usar token para autenticar peticion", async ({ request }) => {
    const loginResponse = await request.post("api/login", {
      data: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
    });

    const { token } = await loginResponse.json();
    const response = await request.get("/api/users/2", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.email).toBe("janet.weaver@reqres.in");
  });
});
