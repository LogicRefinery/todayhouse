import LocalProvider from "./LocalProvider";
import ReactQueryProvider from "./ReactQueryProvider";

export default function CombineProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LocalProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </LocalProvider>
    </>
  );
}
