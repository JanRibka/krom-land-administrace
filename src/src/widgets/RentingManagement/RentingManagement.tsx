import RentingDecorationThemesEditor from "features/renting/RentingDecorationThemesEditor/RentingDecorationThemesEditor";
import RentingItemsEditor from "features/renting/RentingItemsEditor/RentingItemsEditor";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { RentingManagementProps } from "./types/RentingManagementProps";

export const RentingManagement = ({ renting }: RentingManagementProps) => {
  return (
    <ErrorBoundary>
      <Stack spacing={4}>
        <Box>
          <RentingItemsEditor data={renting.items} />
        </Box>
        <Box>
          <RentingDecorationThemesEditor data={renting.decorationThemes} />
        </Box>
      </Stack>
    </ErrorBoundary>
  );
};
