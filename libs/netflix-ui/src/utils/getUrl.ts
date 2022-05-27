export const getImgUrl = (path: string, size: string) => {
  return `${process.env["NX_THEMOVIEDB_IMAGE_URL"]}/${size}${path}`;
}