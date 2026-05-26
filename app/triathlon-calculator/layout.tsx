import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Triathlon Time Calculator | Mike Turko",
    description: "Calculate your estimated finish time for Sprint, Olympic, 70.3, or Ironman triathlons. Enter your swim pace, bike speed, run pace, and transition times.",
    keywords: [
        "triathlon calculator",
        "triathlon finish time",
        "ironman time calculator",
        "70.3 finish time",
        "swim bike run pace calculator",
        "triathlon training tool"
    ]
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}