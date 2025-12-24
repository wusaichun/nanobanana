import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, Image as ImageIcon, AlertCircle } from "lucide-react"

export function Generator() {
    const [prompt, setPrompt] = useState("")
    const [aspectRatio, setAspectRatio] = useState("1:1")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleGenerate = async () => {
        if (!prompt.trim()) return

        setLoading(true)
        setError(null)
        setResult(null)

        try {
            // Mock API call for now since we don't have the backend
            // In production: const res = await fetch('/api/generate', ...)
            await new Promise(resolve => setTimeout(resolve, 2000)) // Simulating network request

            // For demo purpose, we use a placeholder image service
            const width = aspectRatio === "16:9" ? 1024 : aspectRatio === "9:16" ? 576 : 1024
            const height = aspectRatio === "16:9" ? 576 : aspectRatio === "9:16" ? 1024 : 1024
            setResult(`https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${Math.floor(Math.random() * 1000)}`)

        } catch (err) {
            setError(err instanceof Error ? err.message : "生成失败，请稍后重试")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="playground" className="py-20 relative border-b border-primary/20 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.05)_0%,transparent_60%)]">
            <div className="container px-4">
                <div className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border border-primary/30 rounded-3xl p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
                            <span className="text-4xl">🍌</span>
                            nanobanana 极速生成器
                        </h2>
                        <p className="text-muted-foreground">由 Replicate Flux Schnell 驱动，毫秒级出图</p>
                    </div>

                    <div className="space-y-6">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-20 group-hover:opacity-50 transition duration-500 blur"></div>
                            <Textarea
                                placeholder="请在此输入英文描述，例如：a cute cyberpunk cat sitting on a neon roof..."
                                className="relative bg-black/50 border-primary/30 text-lg p-6 min-h-[120px] resize-none focus-visible:ring-primary/50 focus-visible:border-primary transition-all"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="sm:w-1/3">
                                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                                    <SelectTrigger className="h-14 bg-black/50 border-primary/30 text-base">
                                        <SelectValue placeholder="选择比例" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1:1">1:1 (正方形)</SelectItem>
                                        <SelectItem value="16:9">16:9 (横屏)</SelectItem>
                                        <SelectItem value="9:16">9:16 (竖屏)</SelectItem>
                                        <SelectItem value="3:2">3:2 (摄影常规)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                size="lg"
                                className="flex-1 h-14 bg-gradient-to-r from-primary to-secondary text-black font-bold text-lg uppercase tracking-wider hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] transition-all"
                                onClick={handleGenerate}
                                disabled={loading || !prompt.trim()}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        生成中...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-5 w-5" />
                                        立即生成
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="mt-8 min-h-[400px] bg-black/80 rounded-2xl border border-dashed border-gray-700 flex items-center justify-center p-4 overflow-hidden relative group">
                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/50 backdrop-blur-sm">
                                    <div className="relative w-20 h-20">
                                        <div className="absolute inset-0 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                                    </div>
                                </div>
                            )}

                            {result ? (
                                <div className="relative w-full h-full min-h-[400px]">
                                    <Image
                                        src={result}
                                        alt="Generated Result"
                                        fill
                                        className="object-contain rounded-lg animate-in fade-in zoom-in duration-500"
                                        unoptimized
                                    />
                                </div>
                            ) : error ? (
                                <div className="text-red-400 flex flex-col items-center gap-2">
                                    <AlertCircle className="w-8 h-8" />
                                    <p>{error}</p>
                                </div>
                            ) : (
                                <div className="text-gray-600 flex flex-col items-center gap-2">
                                    <ImageIcon className="w-12 h-12 opacity-50" />
                                    <p>图片将在此显示</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
