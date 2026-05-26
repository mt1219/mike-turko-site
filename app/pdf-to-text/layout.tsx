import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "PDF to Text Converter | Mike Turko",
    description: "Extract text from any PDF instantly — runs entirely in your browser, no upload required, no file size limits. Free and private.",
    keywords: [
        "pdf to text",
        "extract text from pdf",
        "pdf converter",
        "browser pdf tool",
        "free pdf extractor",
        "pdf text extractor online"
    ]
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}