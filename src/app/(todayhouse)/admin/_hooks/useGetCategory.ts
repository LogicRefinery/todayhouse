// import { useQuery } from "@tanstack/react-query";
// type GetQuery = { queryKey: string[]; gcTime: number; staleTime: number };

// export function useGetCategory({ queryKey, gcTime, staleTime }: GetQuery) {
//   return useQuery({
//     queryKey: queryKey,
//     queryFn: async () => {
//       const res = await fetch("http://localhost:9090/admin/category", {
//         method: "GET",
//       });
//     },
//   });
// }
// // const { data } = useQuery({
// //   queryKey: searchTerm
// //     ? ["category", "list", searchTerm]
// //     : ["category", "list"],
// //   queryFn: async () => {
// //     const res = await fetch(
// //       searchTerm
// //         ? `http://localhost:9090/admin/category?search=${encodeURIComponent(
// //             searchTerm
// //           )}`
// //         : "http://localhost:9090/admin/category", //encodeURIComponent : 함수는 URI의 특정 문자를 인코딩하여 URL에 안전하게 포함될 수 있도록 합니다.
// //       {
// //         method: "GET",
// //       }
// //     );
// //     return await res.json();
// //   },
// //   staleTime: 15000, //정해진 시간만큼 fresh, stale 상태로 넘어가면 재요청.
// //   gcTime: 20000, //inactive 상태로 정해진 시간이 지나면 아예 메모리에서 삭제.
// // });
