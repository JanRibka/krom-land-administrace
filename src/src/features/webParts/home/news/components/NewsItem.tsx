import SectionSubTitle from "shared/components/sectionSubTitle/SectionSubTitle";
import AppTextEditor from "shared/components/textEditor/AppTextEditor";
import AppTextField from "shared/components/textField/AppTextField";
import { useWebPartsSlice } from "shared/infrastructure/store/webParts/useWebPartsSlice";
import { News } from "shared/models/News";
import { nameof } from "shared/nameof";

import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface NewsItemProps {
  news: News;
  disable?: boolean;
  index: number;
  newsCount: number;
  onEdit?: (news: News) => void;
  onDelete?: (news: News) => void;
}

const NewsItem = ({
  news,
  disable,
  index,
  newsCount,
  onEdit,
  onDelete,
}: NewsItemProps) => {
  // Store
  const { handleHomeNewsUpdate } = useWebPartsSlice();

  // Other
  const handleNewsDelete = () => {
    handleHomeNewsUpdate({ delete: true }, index);
  };

  const handleTextFieldOnBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    const name: string = e.target.name;
    const value: string = e.target.value;

    handleHomeNewsUpdate({ [name]: value }, index);
  };

  const handleTextEditorOnChange = (value: string, name: string) => {
    handleHomeNewsUpdate({ [name]: value }, index);
  };

  return (
    <Box className={index > 0 ? "sub-section-separator" : undefined}>
      <SectionSubTitle title={"Novinka " + newsCount} />
      <Stack spacing={2} direction="column">
        <AppTextField
          name={nameof<News>("title")}
          label="Nadpis"
          value={news.title}
          variant="outlined"
          fullWidth
          required
          disabled={disable}
          autoComplete="off"
          onBlur={handleTextFieldOnBlur}
        />

        <AppTextEditor
          name={nameof<News>("content")}
          value={news.content}
          placeholder="Popis"
          required
          disable={disable ?? false}
          onChange={handleTextEditorOnChange}
        />

        <Button
          color="secondary"
          variant="outlined"
          disabled={disable}
          startIcon={<DeleteIcon />}
          onClick={handleNewsDelete}
        >
          Odebrat novinku
        </Button>
      </Stack>
    </Box>
  );
};

export default NewsItem;
