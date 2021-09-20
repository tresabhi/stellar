const Install = () => {
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    // window['showInstallPromotion']();
  });

  return <a href="https://nice.com/">Nice</a>;
};

export default Install;
