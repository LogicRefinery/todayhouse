export type Product = {
  productId: string;
  categoryInfo: CategoryInfo;
  productName: string;
  productImagesId: string;
  brandName: string;
  productPrice: string;
  shipping: string;
  shippingPrice: number;
};

export type CategoryInfo = {
  categoryName: string;
  categoryId: string;
};

export type ProductList = Product[];

export type Images = { imagesId: string; images: string[]; mainImage: string };

export type CheckedItem = {
  productId: string;
  productImagesId: string;
};

export type CheckState = {
  checked: CheckedItem[];
};
