export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const isWebGLEnabled = () => {
  const canvas = document.createElement('canvas');
  const gl =
    canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  return gl && gl instanceof WebGLRenderingContext;
};
