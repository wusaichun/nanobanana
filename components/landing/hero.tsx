"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1)_0%,transparent_70%)]">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">

                    <div className="space-y-4 max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                            <span className="text-primary mr-2">🍌</span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                nanobanana Pro
                            </span>
                        </h1>

                        <p className="text-2xl md:text-3xl text-gray-400 font-medium">
                            谷歌Gemini驱动的AI视觉设计师
                        </p>

                        <p className="text-xl text-primary font-medium">
                            nanobanana基于Gemini 3 Pro的强大能力，重新定义AI图像生成标准
                        </p>

                        <p className="text-lg text-gray-500">
                            4K高清输出 · 精准中文渲染 · 14图融合创作
                        </p>
                    </div>

                    <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(255,215,0,0.1)] border border-primary/20 hover:scale-[1.02] transition-transform duration-500">
                        <iframe
                            src="//player.bilibili.com/player.html?isOutside=true&aid=115449979213704&bvid=BV1G3y6BVEDD&cid=33460127191&p=1&autoplay=1"
                            scrolling="no"
                            className="absolute top-0 left-0 w-full h-full border-0"
                            frameBorder="0"
                            allowFullScreen
                            referrerPolicy="no-referrer"
                        ></iframe>
                    </div>


                </div>
            </div>
        </section>
    )
}
