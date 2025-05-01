import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

export const server = setupServer(
  http.post("/token-service/v1/request-token", async ({ request }) => {
    const body = await request.json(); 
    const { username, password } = body;
    if (username === "AgilaGrupp3" && password === "AgilaGrupp3") {
      return new HttpResponse("mocked-jwt-token", { status: 200 });
    }
    return new HttpResponse("Fel användarnamn eller lösenord", { status: 401 });
  }),
  http.get("/movies", () => {
    return HttpResponse.json([
      {
        id: 1,
        title: "Inception",
        director: "Christopher Nolan",
        description: "En drömheistfilm",
        productionYear: 2010,
      },
      {
        id: 2,
        title: "Interstellar",
        director: "Christopher Nolan",
        description: "En rymdresa",
        productionYear: 2014,
      },
    ]);
  }),
  http.post("/movies", async ({ request }) => {
    const body = await request.json();
    const { title, director, description, productionYear } = body;
    return HttpResponse.json(
      {
        id: 3,
        title,
        director,
        description,
        productionYear,
      },
      { status: 201 }
    );
  })
);
