(function(window){var svgSprite="<svg>"+""+'<symbol id="icon-houtui" viewBox="0 0 1024 1024">'+""+'<path d="M864.619036 462.987726l0-0.00921L237.33643 462.978517l252.374938-252.375961c12.609179-12.609179 12.609179-33.050744 0-45.659923-12.608156-12.609179-33.050744-12.609179-45.659923 0l-0.007163-0.007163L136.544863 472.437959l0.002047 0.002047c-0.295735 0.295735-0.496304 0.649799-0.779759 0.954745-1.154289 1.245364-2.273786 2.526543-3.221368 3.942799-0.610914 0.912789-1.039679 1.896186-1.548262 2.851954-0.480954 0.902556-1.031493 1.759063-1.426489 2.710738-0.472767 1.143033-0.754177 2.333138-1.089821 3.51301-0.242524 0.845251-0.574075 1.651616-0.748037 2.523473-0.415462 2.090615-0.639566 4.208858-0.638543 6.332219 0 0.002047 0 0.00307 0 0.005117 0 0.063445 0.01842 0.12075 0.01842 0.183172 0.01228 2.000564 0.190335 4.002151 0.572028 5.973038 0.010233 0.055259 0.034792 0.106424 0.046049 0.161682 0.191358 0.960885 0.549515 1.850138 0.823761 2.7793 0.320295 1.089821 0.572028 2.193968 1.010003 3.25309 0.447185 1.077541 1.060145 2.056845 1.616824 3.071965 0.452301 0.828878 0.816598 1.689479 1.347694 2.483564 1.195222 1.789763 2.556219 3.456728 4.076852 4.969175l307.446207 307.446207c12.608156 12.608156 33.050744 12.608156 45.659923 0 12.609179-12.609179 12.609179-33.050744 0-45.659923l0.007163-0.007163L237.34871 527.560394l627.270327 0c17.831111 0 32.286334-14.455223 32.286334-32.286334S882.450147 462.987726 864.619036 462.987726z"  ></path>'+""+"</symbol>"+""+"</svg>";var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)