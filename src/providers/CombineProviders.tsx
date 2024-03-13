import LocalProvider from "./LocalProvider";
import { MswProvider } from "./MswProvider";
import ReactQueryProvider from "./ReactQueryProvider";

export default function CombineProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LocalProvider>
        <ReactQueryProvider>
          <MswProvider />
          {children}
        </ReactQueryProvider>
      </LocalProvider>
    </>
  );
}
