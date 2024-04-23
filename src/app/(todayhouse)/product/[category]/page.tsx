import React from "react";
import Product from "./_components/Product";

const page = ({ params }: { params: { category: string } }) => {
  const categoryId = decodeURIComponent(params.category);

  return (
    <div>
      <Product categoryId={categoryId}></Product>
    </div>
  );
};

export default page;
