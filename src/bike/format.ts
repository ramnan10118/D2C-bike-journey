export function formatRupees(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function formatIdvShort(n: number): string {
  return `₹${(n / 1000).toFixed(2)} K`;
}

export function formatPolicyDate(d: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}
