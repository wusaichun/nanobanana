"use client"

import { Zap, Monitor, MessageSquare } from "lucide-react"

export function Features() {

    const features = [
        {
            title: "中文语义精准理解",
            description: "无需学习复杂提示词，直接使用中文描述画面，AI智能重写优化，让意图完美呈现。",
            icon: <MessageSquare className="w-10 h-10 text-primary" />,
        },
        {
            title: "4K 电影级画质",
            description: "突破性的画质提升，支持最高 4096x4096 分辨率输出，细节纤毫毕现，满足商业级印刷需求。",
            icon: <Monitor className="w-10 h-10 text-primary" />,
        },
        {
            title: "极速秒级生成",
            description: "基于 Flux Schnell 极速引擎，平均生成速度提升 500%，灵感无需等待，创作快人一步。",
            icon: <Zap className="w-10 h-10 text-primary" />,
        },
    ]

    return (
        <section id="features" className="py-24 bg-black relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        三大核心突破
                        <span className="block text-primary mt-2">重新定义创作流</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        不仅是工具，更是你创意的延伸。针对中文环境深度优化，让创作更懂你。
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,215,0,0.1)]"
                        >
                            <div className="mb-6 p-4 rounded-xl bg-black/50 w-fit border border-white/5 group-hover:border-primary/30 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
