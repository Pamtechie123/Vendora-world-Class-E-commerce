import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export const CURRENCY_OPTIONS = ["USD", "EUR", "GBP", "NGN", "AED"] as const;
export type CurrencyCode = (typeof CURRENCY_OPTIONS)[number];

const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  NGN: 1500,
  AED: 3.67,
};

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  NGN: "₦",
  AED: "د.إ",
};

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (value: number) => string;
  convertPrice: (value: number) => number;
  currencyOptions: readonly CurrencyCode[];
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  const value = useMemo<CurrencyContextValue>(() => {
    const convertPrice = (value: number) => value * EXCHANGE_RATES[currency];

    const formatPrice = (value: number) => {
      const converted = convertPrice(value);
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency === "NGN" ? "NGN" : currency === "AED" ? "AED" : currency === "EUR" ? "EUR" : currency === "GBP" ? "GBP" : "USD",
        minimumFractionDigits: currency === "NGN" ? 0 : 2,
        maximumFractionDigits: currency === "NGN" ? 0 : 2,
      });

      const formatted = formatter.format(converted);
      if (currency === "NGN") {
        return formatted.replace("NGN", "₦").replace("₦", "₦");
      }
      if (currency === "AED") {
        return formatted.replace("AED", "د.إ");
      }
      return formatted;
    };

    return {
      currency,
      setCurrency,
      formatPrice,
      convertPrice,
      currencyOptions: CURRENCY_OPTIONS,
    };
  }, [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }

  return context;
}

export function getCurrencySymbol(currency: CurrencyCode) {
  return CURRENCY_SYMBOLS[currency];
}
