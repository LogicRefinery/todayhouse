import { CategoryList } from "@/model/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckState, Images, Product } from "@/model/product";

type GetQueryParameter = {
  queryKey: string[];
  requestUrl: string;
  gcTime: number;
  staleTime: number;
  setDefaultValues?: (v: string) => void;
  queryFn?: () => void;
  enabled?: boolean;
};

const fetchGetData = async (requestUrl: string) => {
  const res = await fetch(requestUrl, { method: "GET", cache: "no-store" });
  return await res.json();
};

export function useQueryGetData({
  queryKey,
  requestUrl,
  gcTime,
  staleTime,
}: GetQueryParameter) {
  const { data, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: () => fetchGetData(requestUrl),
    staleTime: staleTime,
    gcTime: gcTime,
  });
  return { data, isLoading };
}

type DeleteCategoriesParams = { queryKey: string[]; searchTerm: string };

const fetchDeleteCategories = async (categoryIds: string[]) => {
  const res = await fetch("/api/admin/category", {
    method: "DELETE",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(categoryIds),
  });
  return res.json();
};

export function useDeleteCategories({
  queryKey,
  searchTerm,
}: DeleteCategoriesParams) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (categoryIds) => fetchDeleteCategories(categoryIds),
    onMutate: async (variables: string[]) => {
      const prevCategory = queryClient.getQueryData(queryKey) as CategoryList;
      let filterCategory = prevCategory;

      if (prevCategory) {
        filterCategory = prevCategory.filter((category) => {
          return !variables.includes(category.id);
        });
        queryClient.setQueryData(queryKey, filterCategory);

        if (searchTerm) {
          // 검색어가 있는 경우
          const containSearchTermQueryKey = [...queryKey, searchTerm];
          const prevSearchCategory = queryClient.getQueryData(
            containSearchTermQueryKey
          ) as CategoryList;
          let filterSearchCategory = prevSearchCategory;

          if (prevSearchCategory) {
            filterSearchCategory = prevSearchCategory.filter((category) => {
              return !variables.includes(category.id);
            });
            queryClient.setQueryData(
              containSearchTermQueryKey,
              filterSearchCategory
            );
          }
        }
      }

      return {
        prevCategory,
        filterCategory,
      };
    },
    onError: (error, variables, context) => {
      console.error(
        "에러 발생 : 카테고리 삭제를 실패하였습니다. 삭제 요청한 카테고리 : ",
        variables,
        error
      );
      queryClient.setQueryData(queryKey, context?.prevCategory);
    },
    onSuccess: async (response, variables, prev) => {},
  });
  return { mutation };
}

type FetchCreateCategoriesPrams = { id: string; categoryName: string };
const fetchCreateCategories = async ({
  id,
  categoryName,
}: FetchCreateCategoriesPrams) => {
  const res = await fetch("/api/admin/category", {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name: categoryName }),
  });
  return res.json();
};

type UseCreateCategoriesPrams = {
  queryKey: string[];
  resetCategoryName: () => void;
};

export function useCreateCategories({
  queryKey,
  resetCategoryName,
}: UseCreateCategoriesPrams) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, categoryName }: FetchCreateCategoriesPrams) =>
      fetchCreateCategories({ id, categoryName }),
    onError: (error, variables, context) => {
      console.error(
        "에러 발생 : 카테고리 생성을 실패하였습니다.",
        variables,
        error
      );
    },
    onSuccess() {
      resetCategoryName();
      queryClient.invalidateQueries({
        queryKey: queryKey,
        refetchType: "active",
      });
    },
  });
  return { mutation };
}

const fetchCreateProduct = async (product: Product) => {
  const res = await fetch("/api/admin/product", {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return await res.json();
};

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (product: Product) => fetchCreateProduct(product),
    onSuccess(response) {
      queryClient.invalidateQueries({
        queryKey: ["admin", "products"],
        refetchType: "active",
      });
    },
  });
  return { mutation };
}
const fetchDeleteProduct = async (product: CheckState) => {
  const res = await fetch("/api/admin/product", {
    method: "DELETE",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return await res.json();
};

export function useDeleteProduct({ queryKey }: { queryKey: string[] }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (product: CheckState) => fetchDeleteProduct(product),
    onSuccess(response) {
      queryClient.invalidateQueries({
        queryKey,
        refetchType: "active",
      });
    },
  });
  return { mutation };
}

const fetchModifyProduct = async (product: Product) => {
  const res = await fetch("/api/admin/product", {
    method: "PATCH",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return await res.json();
};

export function useModifyProduct({ queryKey }: { queryKey: string[] }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (product: Product) => fetchModifyProduct(product),
    onSuccess(response) {
      queryClient.invalidateQueries({
        queryKey: ["admin", "products"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: queryKey,
        refetchType: "active",
      });
    },
  });
  return { mutation };
}

const fetchCreateImages = async (images: Images) => {
  const res = await fetch("/api/admin/product/images", {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(images),
  });
  return await res.json();
};
export function useCreateImages() {
  const mutation = useMutation({
    mutationFn: (images: Images) => fetchCreateImages(images),
    onSuccess(response) {},
  });
  return { mutation };
}
const fetchDeleteImages = async (images: CheckState) => {
  const res = await fetch("/api/admin/product/images", {
    method: "DELETE",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(images),
  });
  return await res.json();
};

export function useDeleteImages({ queryKey }: { queryKey: string[] }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (images: CheckState) => fetchDeleteImages(images),
    onSuccess(response) {
      queryClient.invalidateQueries({
        queryKey,
        refetchType: "active",
      });
    },
  });
  return { mutation };
}

const fetchModifyImages = async (images: Images) => {
  const res = await fetch("/api/admin/product/images", {
    method: "PATCH",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(images),
  });
  return await res.json();
};

export function useModifyImages({ queryKey }: { queryKey: string[] }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (images: Images) => fetchModifyImages(images),
    onSuccess(response) {
      queryClient.invalidateQueries({
        queryKey: ["admin", "products", "images"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: queryKey,
        refetchType: "active",
      });
    },
  });
  return { mutation };
}
