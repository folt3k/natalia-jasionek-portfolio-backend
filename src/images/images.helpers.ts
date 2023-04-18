export const generateImagesFormats =
  (url: string) =>
  (format: "md" | "full"): string => {
    let urlFormatValue: string;

    switch (format) {
      case "full":
        urlFormatValue = "q_auto:best";
        break;
      case "md":
        urlFormatValue = "q_100/c_fill,w_512";
        break;
    }

    return url.replace("/image/upload/", `/image/upload/${urlFormatValue}/`);
  };
