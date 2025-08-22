interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
}

const reportWebVitals = (onPerfEntry?: (metric: WebVitalMetric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then((webVitals) => {
      if (webVitals.onCLS) webVitals.onCLS(onPerfEntry);
      if (webVitals.onFCP) webVitals.onFCP(onPerfEntry);
      if (webVitals.onLCP) webVitals.onLCP(onPerfEntry);
      if (webVitals.onTTFB) webVitals.onTTFB(onPerfEntry);
      // onFID is deprecated in web-vitals v5, replaced by onINP
      if (webVitals.onINP) webVitals.onINP(onPerfEntry);
    });
  }
};

export default reportWebVitals;
