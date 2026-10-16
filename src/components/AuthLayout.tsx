
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
    eyebrow: string;
    title: string;
    description: string;
    children: ReactNode;
    footer?: ReactNode;
    logoHref?: string;
}

export default function AuthLayout({
    eyebrow,
    title,
    description,
    children,
    footer,
    logoHref = "/register",
}: AuthLayoutProps) {
    return (
        <main className="relative min-h-dvh overflow-x-hidden bg-[#09090f] font-sans text-slate-100 lg:h-dvh lg:overflow-hidden">
            {/* Ambient background accents */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/10 blur-[100px]"
            />

            <div
                aria-hidden="true"
                className="pointer-events-none fixed -bottom-40 right-0 h-96 w-96 rounded-full bg-cyan-500/[0.07] blur-[100px]"
            />

            <div className="relative mx-auto grid min-h-dvh max-w-[1600px] lg:h-dvh lg:min-h-0 lg:grid-cols-[0.9fr_1.1fr]">
                {/* Left branding panel */}
                <section className="relative hidden flex-col justify-between border-r border-white/[0.07] px-10 py-8 lg:flex xl:px-16 xl:py-10">
                    <Link
                        to={logoHref}
                        className="flex w-fit items-center gap-3"
                    >
                        <span className="grid h-10 w-10 place-items-center rounded-xl border border-violet-400/30 bg-violet-500/10 text-xl text-violet-300 shadow-lg shadow-violet-950/30">
                            ◈
                        </span>

                        <span className="text-xl font-bold tracking-tight">
                            Frame<span className="text-violet-400">ly</span>
                        </span>
                    </Link>

                    <div className="max-w-lg py-8">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
                            Your personal image space
                        </div>

                        <h1 className="text-5xl font-semibold leading-[1.12] tracking-[-0.055em] xl:text-6xl">
                            Your images.
                            <br />
                            <span className="bg-gradient-to-r from-violet-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                                Your story.
                            </span>
                            <br />
                            Your order.
                        </h1>

                        <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
                            A calmer way to collect, organize, and manage every
                            image that matters to you.
                        </p>

                        <div className="mt-9 grid max-w-md grid-cols-3 gap-3">
                            {[
                                {
                                    number: "01",
                                    title: "Collect",
                                    detail: "Bulk uploads",
                                },
                                {
                                    number: "02",
                                    title: "Arrange",
                                    detail: "Drag & drop",
                                },
                                {
                                    number: "03",
                                    title: "Refine",
                                    detail: "Edit anytime",
                                },
                            ].map((item) => (
                                <div
                                    key={item.number}
                                    className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-3 xl:p-4"
                                >
                                    <span className="text-[10px] font-semibold tracking-widest text-violet-300">
                                        {item.number}
                                    </span>

                                    <p className="mt-3 text-sm font-semibold text-slate-200">
                                        {item.title}
                                    </p>

                                    <p className="mt-1 text-[10px] text-slate-500 xl:text-xs">
                                        {item.detail}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-[11px] text-slate-600">
                        <span>Made for the way you see things.</span>

                        <span className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Your creative space
                        </span>
                    </div>
                </section>

                {/* Right content panel */}
                <section className="flex min-h-dvh items-center justify-center px-5 py-7 sm:px-8 lg:h-dvh lg:min-h-0 lg:overflow-y-auto lg:px-10 lg:py-5 xl:px-16">
                    <div className="w-full max-w-[420px]">
                        {/* Mobile branding */}
                        <Link
                            to={logoHref}
                            className="mb-7 flex w-fit items-center gap-3 lg:hidden"
                        >
                            <span className="grid h-10 w-10 place-items-center rounded-xl border border-violet-400/30 bg-violet-500/10 text-xl text-violet-300">
                                ◈
                            </span>

                            <span className="text-xl font-bold">
                                Frame<span className="text-violet-400">ly</span>
                            </span>
                        </Link>

                        {/* Page-specific heading */}
                        <header className="mb-6">
                            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-400">
                                {eyebrow}
                            </p>

                            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">
                                {title}
                            </h2>

                            <p className="mt-2 text-sm text-slate-400">
                                {description}
                            </p>
                        </header>

                        {/* Page-specific form */}
                        {children}

                        {/* Page-specific footer */}
                        {footer && (
                            <div className="mt-5 text-center text-xs text-slate-500">
                                {footer}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
