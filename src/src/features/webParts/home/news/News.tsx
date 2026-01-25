import ImageService from "features/ImageService";
import SectionStyled from "features/styledComponents/SectionStyled";
import { useSelector } from "react-redux";
import ImageUpload from "shared/components/imageUpload/ImageUpload";
import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import SectionTitle from "shared/components/sectionTitle/SectionTitle";
import { ImageLocationEnum } from "shared/enums/ImageLocationEnum";
import ErrorBoundary from "shared/infrastructure/ErrorBoundary";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectHome } from "shared/infrastructure/store/webParts/webPartsSlice";
import ImageModel from "shared/models/ImageModel";
import { nameof } from "shared/nameof";
import HomeImageType from "shared/types/HomeImageType";

import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import HomeModel from "../models/HomeModel";
import ButtonWrapperStyled from "../ourTeam/styledComponents/ButtonWrapperStyled";
import NewsItem from "./components/NewsItem";
import { NewsProps } from "./types/NewsProps";

const News = ({ disable }: NewsProps) => {
  // Store
  const home = useSelector(selectHome);
  const { handleHomeNewsAdd } = useWebPartsSlice();

  // Constants
  const _imageService = new ImageService();
  const { handleHomeUpdate, handleNewsImageUpdate } = useWebPartsSlice();
  let newsCount = 0;

  // Other
  const handleOnAfterFileUpload = (
    fileName: string,
    name: string,
    alt: string,
    destination: string,
  ) => {
    const image = new ImageModel({
      path: (process.env.PUBLIC_URL ?? "") + destination + fileName,
      alt: alt,
      name: fileName,
    });

    handleHomeUpdate({ [name]: image });
  };

  const handleOnAfterFileDelete = () => {
    handleNewsImageUpdate(new ImageModel());
  };

  const handleOnFileSave = async (name: string) => {
    let image: ImageModel = home[name as HomeImageType] as ImageModel;

    image = {
      ...image,
      path: (process.env.REACT_APP_WEB_PUBLIC_IMG_URL ?? "") + image.name,
    };

    const result = await _imageService.imageSave(
      image,
      name,
      ImageLocationEnum.HOME,
      home.Id,
    );

    if (result) {
      handleNewsImageUpdate({
        path: (process.env.REACT_APP_WEB_PUBLIC_IMG_URL ?? "") + image.name,
        id: result,
      });
    }
  };

  const handleAddNewsOnClick = () => {
    handleHomeNewsAdd();
  };

  return (
    <ErrorBoundary>
      <SectionStyled component="section">
        <SectionTitle title="Novinky" />

        <Box className="sub-section-separator">
          <SectionSubTitle title="Obrázek" />
          <ImageUpload
            image={home.NewsImage}
            name={nameof<HomeModel>("NewsImage")}
            label="Ideální rozlišení obrázku 1000 x 1000px. Max. velikost 1MB"
            supportedExtensions={["png", "jpg", "jpeg", "webp"]}
            newImageAlt="Novinky a aktuality | KROM Land"
            maxFileSize={1}
            location={ImageLocationEnum.HOME}
            id={home.Id}
            disable={disable}
            onAfterFileUpload={handleOnAfterFileUpload}
            onAfterFileDelete={handleOnAfterFileDelete}
            onFileSave={handleOnFileSave}
          />
        </Box>

        <Box className="sub-section-separator">
          <SectionSubTitle title="Novinky" />
          {(home.News?.length ?? 0) > 0 &&
            home.News?.map((item, index) => {
              if (item.delete) {
                return null;
              }

              newsCount += 1;

              return (
                <NewsItem
                  key={"newsItem_" + index}
                  news={item}
                  disable={disable}
                  index={index}
                  newsCount={newsCount}
                />
              );
            })}
        </Box>

        <ButtonWrapperStyled>
          <Button
            onClick={handleAddNewsOnClick}
            color="secondary"
            variant="contained"
            disabled={disable}
            startIcon={<AddIcon />}
          >
            Přidat novinku
          </Button>
        </ButtonWrapperStyled>
      </SectionStyled>
    </ErrorBoundary>
  );
};

News.displayName = "News";

export default News;
