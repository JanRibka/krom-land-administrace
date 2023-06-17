import { useEffect, useState } from "react";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useTheme } from "@mui/material/styles";

interface IProps {
  level: number;
}

const PasswordStrenghtIndicator = (props: IProps) => {
  // Constants
  const theme = useTheme();

  // State
  const [value, setValue] = useState<number>(0);

  // Other
  useEffect(() => {
    levelToValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.level]);

  const levelToValue = () => {
    let value = props.level * 25;

    if (value > 100) {
      value = 100;
    }

    setValue(value);
  };

  return (
    <LinearProgress
      value={value}
      variant='determinate'
      sx={{
        height: 10,
        borderRadius: 5,
        marginTop: "5px",

        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[200],
        },

        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          transitionDuration: "200ms",
          backgroundColor:
            props.level >= 4
              ? "rgb(30, 174, 0)"
              : props.level === 3
              ? "rgb(165, 166, 0)"
              : props.level === 2
              ? "rgb(210, 164, 0)"
              : props.level === 1
              ? "red"
              : "transparent",
        },
      }}
    />
  );
};

export default PasswordStrenghtIndicator;
