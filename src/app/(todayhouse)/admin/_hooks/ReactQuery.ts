import { Category } from "./../../../../model/category";
import { query } from "express";
import { CategoryList } from "@/model/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type GetQueryParameter = {
  queryKey: string[];
  requestUrl: string;
  gcTime: number;
  staleTime: number;
};

/*
일반적으로 커스텀 훅은 비동기 코드를 직접 포함하지 않습니다.
그 이유는 커스텀 훅은 React 컴포넌트의 생명주기와 관련된 로직을 분리하고 재사용 가능하도록 만드는 데 목적이 있기 때문입니다.
그렇기 때문에 커스텀 훅에서 직접적인 비동기 호출을 포함하는 것은 추천되지 않습니다.

대신, 비동기 호출을 포함하는 함수를 따로 작성하고 해당 함수를 호출하여 데이터를 가져오는 방식을 사용하는 것이 좋습니다.
그리고 이 함수를 커스텀 훅에서 사용하여 데이터를 반환하도록 구현합니다.
*/

const fetchGetCategories = async (requestUrl: string) => {
  const res = await fetch(requestUrl, { method: "GET", cache: "no-store" });
  return await res.json();
};

export function useGetCategories({
  queryKey,
  requestUrl,
  gcTime,
  staleTime,
}: GetQueryParameter) {
  const { data, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: () => fetchGetCategories(requestUrl),
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
