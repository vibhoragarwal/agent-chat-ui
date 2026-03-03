import Image from "next/image";

export function LangGraphLogoSVG({
  className,
  width,
  height,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  const finalWidth = width ?? 160;
  const finalHeight = height ?? 40;

  return (
    <Image
      src="/skf-logo-black.svg"
      alt="SKF logo"
      width={finalWidth}
      height={finalHeight}
      className={className}
      priority
    />
  );
}
