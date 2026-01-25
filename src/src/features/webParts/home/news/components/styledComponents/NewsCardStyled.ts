import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";

interface NewsCardStyledProps {
  colorIndex: number;
}

const colors = [
  { bg: "#E3F2FD", text: "#0D47A1" }, // Light Blue
  { bg: "#F3E5F5", text: "#4A148C" }, // Light Purple
  { bg: "#E8F5E9", text: "#1B5E20" }, // Light Green
  { bg: "#FFF3E0", text: "#E65100" }, // Light Orange
  { bg: "#FCE4EC", text: "#880E4F" }, // Light Pink
  { bg: "#F1F8E9", text: "#33691E" }, // Light Lime
  { bg: "#E0F2F1", text: "#004D40" }, // Light Teal
  { bg: "#FFF8E1", text: "#F57F17" }, // Light Amber
];

const NewsCardStyled = styled(Card)<NewsCardStyledProps>(({
  theme,
  colorIndex,
}) => {
  const colorScheme = colors[colorIndex % colors.length];

  return {
    backgroundColor: colorScheme.bg,
    color: colorScheme.text,
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    height: "100%",
    display: "flex",
    flexDirection: "column",

    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
    },

    h3: {
      color: colorScheme.text,
      marginTop: 0,
      marginBottom: "16px",
      fontSize: "1.5rem",
      fontWeight: 600,
    },

    ".news-content": {
      color: colorScheme.text,
      flexGrow: 1,
      fontSize: "1rem",
      lineHeight: 1.6,

      "& p": {
        margin: "0 0 12px 0",
      },

      "& ul, & ol": {
        paddingLeft: "20px",
        margin: "0 0 12px 0",
      },

      "& a": {
        color: colorScheme.text,
        fontWeight: 600,
        textDecoration: "underline",
      },
    },

    ".news-actions": {
      marginTop: "20px",
      paddingTop: "16px",
      borderTop: `2px solid ${colorScheme.text}20`,
    },
  };
});

export default NewsCardStyled;
