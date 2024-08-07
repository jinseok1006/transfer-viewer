import { create } from "zustand";
import createAsync from "../utils/createAsync";
import staticDataApi from "../api/staticData";

import type { DepartmentLink } from "../types";

export interface TransferStatistics {
  division: string;
  data: TransferData[];
}

type Year = number;
type Grade = 0 | 1 | 2;
type Applicants = number;
type Capacity = number;
export type TransferData = [Year, Grade, Capacity, Applicants];

interface CollegeDivision {
  college: string;
  divisions: string[];
}

interface DivisionsState {
  divisions: string[];
  update: (divisions: string[]) => void;
}

export const useCollegeDivisionStore = createAsync<CollegeDivision[]>(
  staticDataApi.getCollegeDivisions
);

export const useTransferStatisticsStore = createAsync<TransferStatistics[]>(
  staticDataApi.getTransferStatistics
);

export const useDivisionsStore = create<DivisionsState>()((set) => ({
  divisions: [],
  update: (divisions: string[]) => set({ divisions }),
}));

export const useDepartmentLinkStore = createAsync<DepartmentLink>(
  staticDataApi.getDepartmentLinks
);

// getDivisions
useCollegeDivisionStore.subscribe((state) => {
  const collegeDivisionsData = state.data;
  if (!collegeDivisionsData) return;

  const divisions = collegeDivisionsData.flatMap((col) => col.divisions);
  useDivisionsStore.getState().update(divisions);
});
