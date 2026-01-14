import "react-notifications-component/dist/theme.css";
import "animate.css/animate.min.css";

import { Store } from "react-notifications-component";

const AppNotification = (
  title: string,
  message: string,
  type: "success" | "danger" | "info" | "default" | "warning"
) => {
  Store.addNotification({
    title: title,
    message: <div dangerouslySetInnerHTML={{ __html: message }}></div>,
    type: type,
    insert: "bottom",
    container: "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 6000,
      onScreen: false,
      pauseOnHover: true,
      waitForAnimation: false,
      click: true,
      touch: false,
      showIcon: true,
    },
    slidingExit: {
      duration: 800,
      timingFunction: "ease-out",
      delay: 300,
    },
  });
};

export default AppNotification;
