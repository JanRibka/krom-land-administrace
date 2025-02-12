import ImageService from "features/ImageService";
import { useSelector } from "react-redux";
import ImageUpload from "shared/components/imageUpload/ImageUpload";
import { ImageLocationEnum } from "shared/enums/ImageLocationEnum";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { selectGallery } from "shared/infrastructure/store/webParts/webPartsSlice";
import ImageModel from "shared/models/ImageModel";
import { nameof } from "shared/nameof";

import GalleryImageModel from "../../models/GalleryImageModel";
import ImageStyled from "./styledComponents/ImageStyled";

interface IProps {
  index: number;
  imageCount: number;
  image: ImageModel;
  disable: boolean;
}

const Image = (props: IProps) => {
  // Store
  const gallery = useSelector(selectGallery);

  // Constnts
  const _imageService = new ImageService();
  const { handleGalleryGalleryImageUpdate, handleGalleryGalleryImageRemove } =
    useWebPartsSlice();
  const galleryImage = { ...gallery.Images[props.index] };

  // Other
  const handleOnAfterFileUpload = (
    fileName: string,
    name: string,
    alt: string,
    destination: string
  ) => {
    const image = new ImageModel({
      Path: (process.env.PUBLIC_URL ?? "") + destination + fileName,
      Alt: alt,
      Name: fileName,
    });

    handleGalleryGalleryImageUpdate({ [name]: image }, props.index);
  };

  const handleOnAfterFileDelete = async (name: string) => {
    handleGalleryGalleryImageRemove(props.index);
  };

  const handleOnFileSave = async (name: string) => {
    let image: ImageModel = { ...props.image };

    image = {
      ...image,
      Path: (process.env.REACT_APP_WEB_PUBLIC_IMG_URL ?? "") + image.Name,
    };

    const result = await _imageService.imageSave(
      image,
      name,
      ImageLocationEnum.GALLERY_IMAGE,
      galleryImage.Id
    );

    if (!!result) {
      handleGalleryGalleryImageUpdate(
        { [name]: image, Id: result },
        props.index
      );
    }
  };

  return (
    <ImageStyled>
      <ImageUpload
        image={props.image}
        name={nameof<GalleryImageModel>("Image")}
        label='Ideální rozlišení obrázku 1920 x 1280px. Max. velikost 1MB'
        supportedExtensions={["png", "jpg", "jpeg", "webp"]}
        newImageAlt={"Obrázek z akce KROM Land " + props.index}
        maxFileSize={1}
        location={ImageLocationEnum.GALLERY_IMAGE}
        id={galleryImage?.Id ?? null}
        disable={props.disable}
        onAfterFileUpload={handleOnAfterFileUpload}
        onAfterFileDelete={handleOnAfterFileDelete}
        onFileSave={handleOnFileSave}
      />
    </ImageStyled>
  );
};

export default Image;
