import CategoryArticleContainer from "./_components/CategoryArticleContainer";
import MainItemContainer from "./_components/MainItemContainer";

const page = () => {
  return (
    <>
      <h2 className="sr-only"> 상품 구매 페이지 </h2>
      <MainItemContainer />
      <CategoryArticleContainer />
    </>
  );
};

export default page;
