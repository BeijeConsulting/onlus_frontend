import { useMediaQuery } from "react-responsive";

const useResponsive = (): any => {
  const Default = ({ children }: any) => {
    const isNotMobile = useMediaQuery({ minWidth: 992 });
    return isNotMobile ? children : null;
  };

  const Mobile = ({ children }: any) => {
    const isMobile = useMediaQuery({ maxWidth: 991 });
    return isMobile ? children : null;
  };

  return [Mobile, Default];
};

export default useResponsive;
