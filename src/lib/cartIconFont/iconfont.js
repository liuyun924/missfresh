(function(window){var svgSprite="<svg>"+""+'<symbol id="icon-duigouzhuanhuan" viewBox="0 0 1024 1024">'+""+'<path d="M512 1024C229.216 1024 0 794.752 0 512 0 229.216 229.216 0 512 0s512 229.248 512 512C1024 794.752 794.752 1024 512 1024zM512 64C264.576 64 64 264.576 64 512c0 247.424 200.576 448 448 448s448-200.576 448-448C960 264.576 759.392 64 512 64zM457.92 690.272c-1.056 1.504-1.696 3.232-3.04 4.608-6.304 6.304-14.624 9.216-22.88 8.992-8.256 0.192-16.576-2.688-22.848-8.992-1.344-1.344-1.984-3.072-3.04-4.576l-156.992-156.96c-12.192-12.224-12.192-32 0-44.192 12.224-12.192 32-12.192 44.192 0l138.656 138.688 298.656-298.688c12.192-12.192 32-12.192 44.192 0 12.224 12.192 12.224 32 0 44.192L457.92 690.272z"  ></path>'+""+"</symbol>"+""+'<symbol id="icon-arrowu" viewBox="0 0 1024 1024">'+""+'<path d="M692.836625 169.659051c11.294231 11.437493 11.236925 29.829376-0.171915 41.153282L391.654075 509.264703l299.718199 302.591643c11.32186 11.467169 11.264555 29.889751-0.172939 41.210587-11.437493 11.380188-29.859052 11.267625-41.182958-0.143263L331.444784 531.308765c-0.48607-0.517793-0.602727-1.150196-1.060145-1.638313-0.116657-0.144286-0.260943-0.144286-0.373507-0.258896-5.634324-5.689582-8.451486-13.103436-8.451486-20.519336 0-7.471159 2.87549-15.002692 8.622378-20.693298l321.471642-318.713832C663.09116 158.134577 681.512718 158.220534 692.836625 169.659051L692.836625 169.659051 692.836625 169.659051 692.836625 169.659051z"  ></path>'+""+"</symbol>"+""+"</svg>";var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)