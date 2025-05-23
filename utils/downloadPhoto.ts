function forceDownload(blobUrl: string, filename: string) {
  let a: any = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function downloadPhoto(url: string, filename?: string) {
  const defaultFilename = url.split("\\").pop()?.split("/").pop() || "download";
  const finalFilename = filename || defaultFilename;

  fetch(url, {
    headers: new Headers({
      Origin: window.location.origin,
    }),
    mode: "cors",
  })
    .then((response) => response.blob())
    .then((blob) => {
      let blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, finalFilename);
    })
    .catch((e) => console.error(e));
}
