import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = "Plura - run your agency",
  description = "Plura - run your agency in just aone place",
  image = "/assets/preview.png",
  icons = "/assets/plura-logo.svg",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@denvudd",
    },
    icons,
    metadataBase: new URL("https://digital-hippo-production-denvudd.up.railway.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "INR";
    maximumFractionDigits?: number;
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const {
    currency = "INR",
    notation = "compact",
    maximumFractionDigits = 2,
  } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits,
  }).format(numericPrice);
}