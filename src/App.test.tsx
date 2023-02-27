import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import Header from "./components/Header";
beforeEach(() => {
  jest.spyOn(global, "fetch").mockImplementation(((url: string) => {
    if (url.includes("/tv/popular")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              {
                id: 1,
                name: "A Super TV show",
                first_air_date: "2022-10-09",
                poster_path: "/imagetv.jpg",
              },
            ],
          }),
      });
    }
    if (url.includes("/movie/popular")) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              {
                id: 1,
                title: "A Super Movie",
                release_date: "2022-11-09",
                poster_path: "/image.jpg",
              },
            ],
          }),
      });
    }
    throw "no case ";
  }) as any);
});
describe("Date", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should update the date every second", async () => {
    render(<Header />);
    expect(screen.getByText("mercredi 1 janvier, 01:00")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(3000 * 60);
    });
    await waitFor(() => {
      expect(screen.getByText("mercredi 1 janvier, 01:03")).toBeInTheDocument();
    });
  });
});
describe("Watchlist", () => {
  it("should display the watchlist button", () => {
    render(<Header />);
    expect(
      screen.getByRole("button", { name: /watchlist/i })
    ).toBeInTheDocument();
  });
});
describe("Medias", () => {
  it.skip("should display the category titles", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Dernier film populaires" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Dernieres series populaires",
      })
    ).toBeInTheDocument();
  });
  it.skip("should pas de resultat by default", () => {
    render(<App />);
    expect(screen.getAllByText("Pas de resultat")).toHaveLength(2);
  });
  it("should display the results provided by the api", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("A Super Movie")).toBeInTheDocument();
    });
    expect(screen.getByText("2022-11-09")).toBeInTheDocument();
    expect(screen.getByAltText("A Super Movie")).toBeInTheDocument();
    expect(await screen.findByText("A Super TV show")).toBeInTheDocument();
  });
  it("should add a movie to the wathlist on click", async () => {
    const ue = userEvent.setup();
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("A Super Movie")).toBeInTheDocument();
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await ue.click(screen.getByRole("button", { name: /^watchlist$/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
