import { HomePage } from "@/components/home";

/** Cache home HTML for a few minutes to cut TTFB and payload churn on repeat visits (TMDB data does not need to be per-request fresh). */
export const revalidate = 300;

export default HomePage;
