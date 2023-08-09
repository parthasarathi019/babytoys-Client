import { useEffect } from "react";

const usePageTitle = (pageTitle) => {
  useEffect(() => {
    document.title = "EduPlayMart | " + pageTitle;
  }, [pageTitle]);
};

export default usePageTitle;
