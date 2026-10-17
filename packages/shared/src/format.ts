/** Cash amounts in the database are stored in kobo (₦1 = 100 kobo). */
export function formatNairaFromKobo(kobo: number): string {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(kobo / 100);
  }
  
  export function formatNaira(naira: number): string {
    return formatNairaFromKobo(naira * 100);
  }
  
  export function formatCredits(credits: number): string {
    return `${new Intl.NumberFormat("en-NG").format(credits)} credits`;
  }
  
  /** Platform fee, rounded UP, exactly like the database does it. */
  export function priceWithFee(
    base: number,
    feePercent: number,
  ): { base: number; fee: number; total: number } {
    const fee = Math.ceil((base * feePercent) / 100);
    return { base, fee, total: base + fee };
  }
  
  /** For the rounded distances the server returns: "about 300 m" or "about 1.2 km". */
  export function formatApproxDistance(meters: number): string {
    return meters < 1000
      ? `about ${meters} m`
      : `about ${(meters / 1000).toFixed(1)} km`;
  }