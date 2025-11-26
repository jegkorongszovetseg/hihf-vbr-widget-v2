import { useTimeoutFn } from '@vueuse/core';
import { unref, watch } from 'vue';

export function usePopover(popoverRef, timeout = 30000) {
  const { start, stop } = useTimeoutFn(hide, timeout, { immediate: false });

  watch(popoverRef, (reference) => {
    if (!reference)
      return;
    show();
    start();
  });

  function show() {
    unref(popoverRef).showModal();
  }

  function hide() {
    unref(popoverRef).close();
    stop();
  }

  return {
    hide,
  };
}

// const OverlayBanner = {

//   options: {
//     live: false,
//     closetime: 30000,
//   },
//   init(options) {
//     console.log('ready!', options);
//     if (options.live) {
//       this.options.closetime = options.closetime ? options.closetime : this.options.closetime;
//       this.addContainer();
//       this.addHandler();
//       this.checkCookie();
//       this.addTimer();
//     }
//     else {
//       this.removeContent();
//     }
//   },
//   addHandler() {
//     document.addEventListener('click', this.click);
//   },
//   removeHandler() {
//     document.removeEventListener('click', this.click);
//   },
//   click(e) {
//     // console.log(e.target);
//     if (e.target.id === 'ob__fade' || e.target.id === 'ob__close') {
//       OverlayBanner.close();
//     }
//   },
//   open() {
//     document.getElementById('ob__container').classList.add('open');
//   },
//   close() {
//     document.getElementById('ob__container').classList.remove('open');
//     OverlayBanner.removeHandler();
//   },
//   setCookie(cname, cvalue, exhours) {
//     let d = new Date();
//     d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
//     let expires = `expires=${d.toUTCString()}`;
//     document.cookie = `${cname}=${cvalue};${expires};path=/`;
//   },
//   getCookie(cname) {
//     let name = `${cname}=`;
//     let ca = document.cookie.split(';');
//     for (let i = 0; i < ca.length; i++) {
//       let c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return '';
//   },
//   checkCookie() {
//     let ol = this.getCookie('overlay');
//     console.log(`checkCookie:${document.cookie}`);
//     if (ol != '') {
//       console.log(`Welcome again ${ol}`);
//     }
//     else {
//       this.setCookie('overlay', 1, 1);
//       console.log('Created:', document.cookie);
//       this.open();
//     }
//   },
//   addTimer() {
//     OverlayBannerTimer = window.setTimeout(this.close, this.options.closetime);
//   },
//   removeTimer() {
//     window.clearTimeout(OverlayBannerTimer);
//   },
//   removeContent() {
//     let content = document.getElementById('ob__content');
//     content.parentNode.removeChild(content);
//   },
//   addContainer() {
//     let mainContainer = document.createElement('div');
//     mainContainer.id = 'ob__container';
//     mainContainer.classList.add('ob__container');

//     let innerContainer = document.createElement('div');
//     innerContainer.id = 'light';
//     innerContainer.classList.add('white_content');

//     let closeBtn = document.createElement('div');
//     closeBtn.id = 'ob__close';

//     let overlayDiv = document.createElement('div');
//     overlayDiv.id = 'ob__fade';
//     overlayDiv.classList.add('black_overlay');

//     let contentOuter = document.createElement('div');
//     let content = document.getElementById('ob__content');
//     contentOuter.innerHTML = content.innerHTML;
//     content.parentNode.removeChild(content);

//     innerContainer.appendChild(closeBtn);
//     innerContainer.appendChild(contentOuter);
//     mainContainer.appendChild(innerContainer);
//     mainContainer.appendChild(overlayDiv);
//     document.body.appendChild(mainContainer);
//   },

// };
