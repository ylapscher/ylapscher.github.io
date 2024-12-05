'use client';

import { useEffect } from "react";

// Add type definitions
declare global {
  interface Window {
    Cal?: any;
  }
}

interface CalApi {
  q: any[];
  push: (arg: any) => void;
}

export default function Calendar() {
  useEffect(() => {
    // Initialize Cal
    (function (C: Window, A: string, L: string) {
      let p = function (a: CalApi, ar: unknown) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = Object.assign(function () { p(api as CalApi, arguments); }, {
            q: [] as any[],
            push: function(arg: any) { this.q.push(arg); }
          });
          const namespace = ar[1];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    // Configure Cal
    (window.Cal as any)("init", "30min", {origin:"https://cal.com"});
    (window.Cal as any).ns["30min"]("inline", {
      elementOrSelector:"#my-cal-inline",
      config: {"layout":"month_view"},
      calLink: "lapscher/30min",
    });
    (window.Cal as any).ns["30min"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Schedule a Session</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Select a time that works best for you, and I'll be happy to help.
        </p>
      </div>
      <div className="h-[600px] bg-white dark:bg-gray-700 rounded-lg">
        <div id="my-cal-inline" style={{ width: '100%', height: '100%', overflow: 'scroll' }} />
      </div>
    </div>
  );
} 