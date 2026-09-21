'use client';

import { useEffect } from 'react';
import { BOOKING_CAL_LINK } from '../lib/site';

declare global {
  interface Window {
    Cal?: any;
  }
}

interface CalApi {
  q: any[];
  push: (arg: any) => void;
}

const CAL_NAMESPACE = BOOKING_CAL_LINK.split('/').pop() ?? '15min';

export default function Calendar() {
  useEffect(() => {
    // Initialize Cal
    (function (C: Window, A: string, L: string) {
      const p = function (a: CalApi, ar: unknown) { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function (...args: any[]) {
        const cal = C.Cal;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (args[0] === L) {
          const api = Object.assign(function (...fnArgs: any[]) { p(api as CalApi, fnArgs); }, {
            q: [] as any[],
            push: function(arg: any) { this.q.push(arg); }
          });
          const namespace = args[1];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], args);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, args);
          return;
        }
        p(cal, args);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    (window.Cal as any)("init", CAL_NAMESPACE, {origin:"https://cal.com"});
    (window.Cal as any).ns[CAL_NAMESPACE]("inline", {
      elementOrSelector:"#my-cal-inline",
      config: {"layout":"month_view"},
      calLink: BOOKING_CAL_LINK,
    });
    (window.Cal as any).ns[CAL_NAMESPACE]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
  }, []);

  return (
    <div className="relative h-[600px] bg-white dark:bg-gray-800 rounded-lg">
      <div
        id="my-cal-inline"
        className="absolute inset-0"
        style={{ width: '100%', height: '100%', overflow: 'auto' }}
      />
    </div>
  );
}
