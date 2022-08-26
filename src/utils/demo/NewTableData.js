import React from "react";
export const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true,
  },
  {
    name: "Director",
    selector: "director",
    sortable: true,
  },
  {
    name: "Genres",
    selector: "genres",
    sortable: true,
    cell: (d) => <span>{d.genres.join(", ")}</span>,
  },
  {
    name: "Year",
    selector: "year",
    sortable: true,
  },
];

export const data = [
  {
    title: "Beetlejuice",
    year: "1988",
    genres: ["Comedy", "Fantasy"],
    director: "Tim Burton",
  },
  {
    id: 2,
    title: "The Cotton Club",
    year: "1984",
    runtime: "127",
    genres: ["Crime", "Drama", "Music"],
    director: "Francis Ford Coppola",
  },
];
