'use client';

import { useEffect } from "react";

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
    <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-8 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4">Schedule a Session</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Select a time that works best for you. Looking forward to connecting!
        </p>
      </div>
      <div className="relative h-[500px] sm:h-[600px] bg-white dark:bg-gray-700 rounded-lg">
        {/* Scroll indicator - only visible on mobile */}
        <div className="sm:hidden absolute inset-0 flex items-center justify-center pointer-events-none bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-700 z-10">
          <div className="animate-bounce text-gray-400 dark:text-gray-500 mb-8">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
        <div 
          id="my-cal-inline" 
          className="absolute inset-0"
          style={{ width: '100%', height: '100%', overflow: 'auto' }} 
        />
      </div>
    </div>
  );
} 