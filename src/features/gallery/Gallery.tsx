import PageTitle from "shared/components/pageTitle/PageTitle";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";

import { Stack } from "@mui/system";

import ExternalGalleryLink from "./externalGalleryLink/ExternalGalleryLink";
import GalleryImages from "./galleryImages/GalleryImages";
import PageHeader from "./pageHeader/PageHeader";
import Seo from "./seo/Seo";

const Gallery = () => {
  return (
    <ErrorBoundary>
      <Stack spacing={4}>
        <PageTitle title='Galerie' />
        <Seo />
        <PageHeader />
        <GalleryImages />
        <ExternalGalleryLink />
      </Stack>
    </ErrorBoundary>
  );
};

export default Gallery;
