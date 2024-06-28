import { useEffect } from "react";

const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = title + " - Moda Sustentável";
  }, [title]);
}
export default PageTitle;