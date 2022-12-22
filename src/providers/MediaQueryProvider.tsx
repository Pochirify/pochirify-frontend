import { createContext, FC, useContext, useMemo } from "react";
import useMedia from "use-media";

type Props = {
  children: React.ReactNode;
};

type Context = {
  isMobileSite: boolean;
  isPcSite: boolean;
};

const MediaQueryContext = createContext<Context>({
  isMobileSite: false,
  isPcSite: true,
});

const mediaQueries = {
  mobile: "(max-width: 500px)",
  desktop: "(min-width: 501px)",
};

export const MediaQueryProvider: FC<Props> = ({ children }: Props) => {
  const isMobileSite = useMedia(mediaQueries.mobile);
  const isPcSite = useMedia(mediaQueries.desktop);
  const value = useMemo(
    () => ({ isMobileSite, isPcSite }),
    [isMobileSite, isPcSite]
  );

  return (
    <MediaQueryContext.Provider value={value}>
      {children}
    </MediaQueryContext.Provider>
  );
};

export const useMediaQueryContext = (): Context =>
  useContext(MediaQueryContext);
