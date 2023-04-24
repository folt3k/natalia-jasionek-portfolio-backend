export const generateImagesFormats =
  (url: string) =>
  (format: "md" | "full"): string => {
    let urlFormatValue: string;

    switch (format) {
      case "full":
        urlFormatValue = "q_auto:best";
        break;
      case "md":
        urlFormatValue = "t_Instagram%20feed";
        break;
    }

    return url.replace("/image/upload/", `/image/upload/${urlFormatValue}/`);
  };
