"use client";

import React from "react";
import { type FunctionComponent, type PropsWithChildren, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { atom, useAtom } from "jotai";

const rqDevtools = atom(false);

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

export const QueryClientProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(new QueryClient());
  const [show, setShow] = useAtom(rqDevtools);

  //   const show = useRQDevtoolsInProd((state) => state.show);
  //const toggleDevtools = setShow(!show);

  useEffect(() => {
    // @ts-expect-error - this is a custom function
    window.toggleDevtools = () => setShow(!show);
  }, [setShow, show]);

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />

      {show && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
    </ReactQueryClientProvider>
  );
};
