import { createTable } from "@tanstack/svelte-table";

export const leaderboardTable = createTable({
  columns: [
    {
      id: "rank",
      header: "Rank",
      accessorFn: (_, index) => index + 1,
    },
    {
      id: "player",
      header: "Player",
      accessorKey: "name",
    },
    {
      id: "score",
      header: "Score",
      accessorKey: "score",
      sortingFn: "number",
    },
    {
      id: "date",
      header: "Date",
      accessorKey: "createdAt",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    },
  ],
  defaultColumn: {
    enableSorting: true,
    enableFiltering: true,
  },
});
