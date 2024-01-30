import { Models } from "appwrite";
import Loader from "./Loader";
import GridPostList from "./GridPostList";

// type SearchResultsProps = {
//   isSearchFetching: boolean;
//   searchedPosts: Models.DocumentList<Models.Document>;
// };

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.DocumentList<Models.Document> | undefined;
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultsProps) => {
  if (isSearchFetching) return <Loader />;

  if (searchedPosts && searchedPosts.documents.length > 0)
    return <GridPostList posts={searchedPosts.documents} />;

  return (
    <p className="w-full mt-10 text-center text-light-4">Aucun résultat</p>
  );
};

export default SearchResults;
