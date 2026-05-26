'use client';

import { useState, useRef, useCallback } from 'react';
import PageHero from '@/src/components/ui/PageHero';
import { FileTextIcon } from 'lucide-react';
import { trackClick } from '@/lib/track-clicks';

export default function PdfToTextPage() {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
    const [progress, setProgress] = useState(0);
    const [extractedText, setExtractedText] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = (f: File) => {
        if (f.type !== 'application/pdf') {
            setErrorMsg('Please upload a valid PDF file.');
            setStatus('error');
            return;
        }
        setFile(f);
        setStatus('idle');
        setExtractedText('');
        setErrorMsg('');
        setProgress(0);
        setPageCount(0);
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const f = e.dataTransfer.files[0];
        if (f) handleFile(f);
    }, []);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleConvert = async () => {
        if (!file) return;

        trackClick('pdf_to_text_convert', {
            location: 'pdf_to_text_page',
            fileName: file.name,
            fileSizeMB: parseFloat((file.size / 1024 / 1024).toFixed(2)),
            timestamp: Date.now()
        });
        setStatus('loading');
        setProgress(0);
        setExtractedText('');
        setErrorMsg('');

        try {
            // Dynamically import pdfjs-dist (client-side only)
            const pdfjsLib = await import('pdfjs-dist');

            // Set worker source — adjust path if needed based on your Next.js setup
            // Set worker source — adjust path if needed based on your Next.js setup
            pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
                'pdfjs-dist/build/pdf.worker.min.mjs',
                import.meta.url
            ).toString();



            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            const total = pdf.numPages;
            setPageCount(total);

            let fullText = '';

            for (let i = 1; i <= total; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const pageText = content.items
                    .map((item: any) => ('str' in item ? item.str : ''))
                    .join(' ');
                fullText += `--- Page ${i} ---\n${pageText}\n\n`;
                setProgress(Math.round((i / total) * 100));
            }

            setExtractedText(fullText.trim());
            setStatus('done');
        } catch (err: any) {
            console.error(err);
            setErrorMsg('Failed to extract text. The PDF may be scanned or image-based.');
            setStatus('error');
        }
    };

    const handleDownload = () => {
        if (!extractedText) return;
        const blob = new Blob([extractedText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file ? file.name.replace(/\.pdf$/i, '.txt') : 'output.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleReset = () => {
        setFile(null);
        setStatus('idle');
        setExtractedText('');
        setErrorMsg('');
        setProgress(0);
        setPageCount(0);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div>
            <PageHero
                title="PDF to Text Converter"
                description="Extract all text from any PDF — runs entirely in your browser, no upload required"
                icon={<FileTextIcon className="w-10 h-10" />}
            />

            <div className="container mx-auto px-4 max-w-2xl py-12">
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl border border-[#00ff41]/20 overflow-hidden">
                    <div className="p-6 space-y-6">

                        {/* Drop Zone */}
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onClick={() => fileInputRef.current?.click()}
                            className={`
                                relative cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-all
                                ${isDragging
                                    ? 'border-[#00ff41] bg-[#00ff41]/10'
                                    : file
                                        ? 'border-[#00ff41]/60 bg-[#00ff41]/5'
                                        : 'border-gray-700 hover:border-[#00ff41]/40 hover:bg-gray-900/50'
                                }
                            `}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                            />
                            <FileTextIcon className={`w-10 h-10 mx-auto mb-3 ${file ? 'text-[#00ff41]' : 'text-gray-600'}`} />
                            {file ? (
                                <div>
                                    <p className="text-[#00ff41] font-mono font-semibold truncate">{file.name}</p>
                                    <p className="text-gray-500 text-sm mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-gray-300 font-semibold">Drop your PDF here</p>
                                    <p className="text-gray-500 text-sm mt-1">or click to browse — any size, processed locally</p>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleConvert}
                                disabled={!file || status === 'loading'}
                                className={`
                                    flex-1 py-3 rounded-xl font-semibold font-mono transition-all
                                    ${!file || status === 'loading'
                                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                        : 'bg-[#00ff41] text-black hover:bg-[#00ff41]/90 active:scale-[0.98]'
                                    }
                                `}
                            >
                                {status === 'loading' ? `Converting... ${progress}%` : 'Convert to Text'}
                            </button>

                            {(file || status !== 'idle') && (
                                <button
                                    onClick={handleReset}
                                    className="px-4 py-3 rounded-xl border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-all font-mono text-sm"
                                >
                                    Reset
                                </button>
                            )}
                        </div>

                        {/* Progress Bar */}
                        {status === 'loading' && (
                            <div className="space-y-2">
                                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="bg-[#00ff41] h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <p className="text-gray-500 text-xs font-mono text-center">
                                    Processing page {Math.ceil((progress / 100) * pageCount)} of {pageCount || '...'}
                                </p>
                            </div>
                        )}

                        {/* Error */}
                        {status === 'error' && (
                            <div className="bg-red-950/50 border border-red-500/50 rounded-xl p-4">
                                <p className="text-red-400 text-sm font-mono">{errorMsg}</p>
                            </div>
                        )}

                        {/* Results */}
                        {status === 'done' && extractedText && (
                            <div className="space-y-4">
                                {/* Stats */}
                                <div className="bg-[#00ff41]/10 border border-[#00ff41] rounded-xl p-4 flex items-center justify-between">
                                    <div>
                                        <p className="text-[#00ff41]/80 text-xs mb-1">Extraction Complete</p>
                                        <p className="text-[#00ff41] font-mono font-bold">
                                            {pageCount} pages · {extractedText.split(/\s+/).length.toLocaleString()} words
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleDownload}
                                        className="bg-[#00ff41] text-black px-5 py-2 rounded-xl font-semibold font-mono text-sm hover:bg-[#00ff41]/90 active:scale-[0.98] transition-all"
                                    >
                                        Download .txt
                                    </button>
                                </div>

                                {/* Preview */}
                                <div className="space-y-2">
                                    <label className="block font-semibold text-gray-300 text-sm">Preview</label>
                                    <textarea
                                        readOnly
                                        value={extractedText}
                                        rows={10}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-700 bg-black/50 text-gray-300 font-mono text-xs resize-none outline-none focus:border-[#00ff41]/40 transition-all"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-center text-gray-500 text-xs mt-6">
                    Your PDF never leaves your device — all processing happens locally in your browser.
                </p>
            </div>
        </div>
    );
}
