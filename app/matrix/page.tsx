import type { Metadata } from "next";
import dynamic from "next/dynamic";

const MatrixView = dynamic(() => import("@/app/matrix/matrix-view").then((module) => module.MatrixView), {
  ssr: false
});

export const metadata: Metadata = {
  title: "文明产业金字塔 · 2076零",
  description: "美股公司层级与依赖关系三维视图"
};

export default function MatrixPage(): JSX.Element {
  return <MatrixView />;
}
